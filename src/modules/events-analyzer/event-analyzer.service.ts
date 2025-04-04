import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/events.entity';
import { Speaker } from './entities/speaker.entity';
import { Product } from '../products/entities/product.entity';
import { UserService } from '../user/user.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventRepository } from './repository/events.repository';
import { QueryEventsDto } from './dto/query-events.dto';

@Injectable()
export class EventAnalyzerService {
  private readonly logger = new Logger(EventAnalyzerService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Speaker)
    private readonly speakerRepository: Repository<Speaker>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UserService,
    private readonly eventRepositoryCustom: EventRepository,
  ) {}

  async getAllEvents(productId: string, queryParams: QueryEventsDto) {
    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'getAllEvents',
      info: 'Fetching events with filters',
      data: { productId, queryParams }
    });

    // Check if product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      this.logger.error({
        module: 'events-analyzer',
        class: 'EventAnalyzerService',
        method: 'getAllEvents',
        errorMessage: 'Product not found',
        data: { productId }
      });
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const { events, total } = await this.eventRepositoryCustom.findAllWithFilters(
      productId,
      queryParams,
    );

    // Get additional stats
    const uniqueLocations = await this.eventRepository
      .createQueryBuilder('event')
      .select('COUNT(DISTINCT event.eventLocation)', 'count')
      .where('event.product.id = :productId', { productId })
      .getRawOne();

    const uniqueSpeakers = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.speakers', 'speakers')
      .select('COUNT(DISTINCT speakers.id)', 'count')
      .where('event.product.id = :productId', { productId })
      .getRawOne();

    const totalRSVPs = await this.eventRepository
      .createQueryBuilder('event')
      .select('SUM(JSONB_ARRAY_LENGTH(event.rsvpList))', 'count')
      .where('event.product.id = :productId', { productId })
      .getRawOne();

    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'getAllEvents',
      info: 'Events fetched successfully',
      data: { total, stats: { total, uniqueLocations, uniqueSpeakers, totalRSVPs } }
    });

    return {
      events,
      pagination: {
        total,
        page: queryParams.page || 1,
        limit: queryParams.limit || 10,
        totalPages: Math.ceil(total / (queryParams.limit || 10)),
      },
      stats: [
        {
          key: 'total_events',
          label: 'Total Events',
          value: total || 0,
          percentageChange: 0
        },
        {
          key: 'unique_locations',
          label: 'Unique Locations',
          value: parseInt(uniqueLocations.count) || 0,
          percentageChange: 0
        },
        {
          key: 'unique_speakers',
          label: 'Unique Speakers',
          value: parseInt(uniqueSpeakers.count) || 0,
          percentageChange: 0
        },
        {
          key: 'total_rsvps',
          label: 'Total RSVPs',
          value: parseInt(totalRSVPs.count) || 0,
          percentageChange: 0
        }
      ]
    };
  }

  async getMonthlyMeetupsByCity(productId: string, city: string) {
    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'getMonthlyMeetupsByCity',
      info: 'Fetching monthly meetups by city',
      data: { productId, city }
    });

    // Check if product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      this.logger.error({
        module: 'events-analyzer',
        class: 'EventAnalyzerService',
        method: 'getMonthlyMeetupsByCity',
        errorMessage: 'Product not found',
        data: { productId }
      });
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const monthlyMeetups = await this.eventRepositoryCustom.getMonthlyMeetupsByCity(
      productId,
      city,
    );

    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'getMonthlyMeetupsByCity',
      info: 'Monthly meetups fetched successfully',
      data: { monthlyMeetups }
    });

    return monthlyMeetups;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    productId: string,
    userId: string,
  ): Promise<Event> {
    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'createEvent',
      info: 'Creating event',
      data: { createEventDto, productId, userId }
    });

    // Check if product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      this.logger.error({
        module: 'events-analyzer',
        class: 'EventAnalyzerService',
        method: 'createEvent',
        errorMessage: 'Product not found',
        data: { productId }
      });
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Get user
    const user = await this.userService.findOneById(userId);
    if (!user) {
      this.logger.error({
        module: 'events-analyzer',
        class: 'EventAnalyzerService',
        method: 'createEvent',
        errorMessage: 'User not found',
        data: { userId }
      });
      throw new NotFoundException('User not found');
    }

    // Check for duplicate event name within the same product
    const existingEventWithSameName = await this.eventRepository.findOne({
      where: {
        eventName: createEventDto.eventName,
        product: { id: productId },
      },
    });

    if (existingEventWithSameName) {
      this.logger.error({
        module: 'events-analyzer',
        class: 'EventAnalyzerService',
        method: 'createEvent',
        errorMessage: 'Event with same name exists',
        data: { eventName: createEventDto.eventName }
      });
      throw new ConflictException(
        `An event with name "${createEventDto.eventName}" already exists in this product`,
      );
    }

    // Check for overlapping events at the same location
    const overlappingEvent = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.product.id = :productId', { productId })
      .andWhere('event.eventLocation = :location', {
        location: createEventDto.eventLocation,
      })
      .andWhere(
        '(event.eventStartDateTime <= :endDateTime AND event.eventEndDateTime >= :startDateTime)',
        {
          startDateTime: createEventDto.eventStartDateTime,
          endDateTime: createEventDto.eventEndDateTime,
        },
      )
      .getOne();

    if (overlappingEvent) {
      this.logger.error({
        module: 'events-analyzer',
        class: 'EventAnalyzerService',
        method: 'createEvent',
        errorMessage: 'Overlapping event exists',
        data: { location: createEventDto.eventLocation }
      });
      throw new ConflictException(
        'There is already an event scheduled at this location during the specified time period',
      );
    }

    // Create the event
    const event = this.eventRepository.create({
      ...createEventDto,
      product,
      createdBy: user,
      updatedBy: user,
    });

    const savedEvent = await this.eventRepository.save(event);

    // Create speakers if provided
    if (createEventDto.speakers && createEventDto.speakers.length > 0) {
      const speakers = await Promise.all(
        createEventDto.speakers.map(async (speakerDto) => {
          let speaker = await this.speakerRepository.findOne({
            where: { name: speakerDto.name }
          });

          if (!speaker) {
            speaker = this.speakerRepository.create(speakerDto);
            speaker = await this.speakerRepository.save(speaker);
          }

          return speaker;
        })
      );

      savedEvent.speakers = speakers;
      await this.eventRepository.save(savedEvent);
    }

    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'createEvent',
      info: 'Event created successfully',
      data: savedEvent
    });

    return savedEvent;
  }
}
