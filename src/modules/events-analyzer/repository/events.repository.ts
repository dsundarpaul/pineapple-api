import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, Between, FindOptionsWhere } from "typeorm";
import { CreateEventDto } from "../dto/create-event.dto";
import { Event } from "../entities/events.entity";
import { Product } from "@/modules/products/entities/product.entity";
import { User } from "@/modules/user/entities/user.entity";

export interface EventQueryParams {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  venue?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly _eventRepository: Repository<Event>
  ) {}

  private readonly _logger = new Logger(EventRepository.name)

  async createEvent(createEventDto: CreateEventDto, product: Product, user: User) {
    try {
      this._logger.log({
        module: 'events',
        class: 'EventRepository',
        method: 'createEvent',
        errorMessage: 'Creating new event',
        context: createEventDto
      })
    
      this._eventRepository.create({
        eventName: createEventDto.eventName,
        eventDescription: createEventDto.eventDescription,
        eventLocation: createEventDto.eventLocation,
        eventVenue: createEventDto.eventVenue,
        product: product,
        createdBy: user
      })

    } catch (error) {
      this._logger.error({
        module: 'events',
        class: 'EventRepository',
        method: 'createEvent',
        errorMessage: 'Failed to create event',
        context: error
      })
    }
  }

  async getEventList(productId: string): Promise<Event[]> {
    try {
      this._logger.log({
        module: 'events',
        class: 'EventRepository',
        method: 'getEventList',
        errorMessage: 'Getting all events',
        context: productId
      })
      return await this._eventRepository.find({ where: { product: { id: productId} } })
    } catch (error) {
      this._logger.error({
        module: 'events',
        class: 'EventRepository',
        method: 'getEventList',
        errorMessage: 'Failed to get all events',
        context: error
      })
    }
  }

  async getEventsByProductId(productId: string): Promise<Event[]> {
    try {
      return await this._eventRepository.find({
        where: {
          // product: { id: productId}
        }
      })
    } catch (error) {
      this._logger.error({
        module: 'events',
        class: 'EventRepository',
        method: 'getEventsByProductId',
        errorMessage: 'Failed to get all events',
        context: error
      })
    }
  }

  async getEventById(eventId:string) {
    try {
      this._logger.error({ module: 'events', class: 'EventRepository', method: 'getEventById', errorMessage: 'getting event details', context: eventId })
      
      return null;
    } catch (error) {
      this._logger.error({ module: 'events', class: 'EventRepository', method: 'getEventsByProductId', errorMessage: 'Failed to event', context: error
      })
    }
  }

  async findAllWithFilters(
    productId: string,
    params: EventQueryParams,
  ): Promise<{ events: Event[]; total: number }> {
    const {
      search,
      startDate,
      endDate,
      location,
      venue,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = params;

    const queryBuilder = this._eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.speakers', 'speakers')
      .leftJoinAndSelect('event.createdBy', 'createdBy')
      .leftJoinAndSelect('event.updatedBy', 'updatedBy')
      .where('event.product.id = :productId', { productId });

    // Apply search filter
    if (search) {
      queryBuilder.andWhere(
        '(event.eventName ILIKE :search OR event.eventDescription ILIKE :search OR event.eventAgenda ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Apply date range filter
    if (startDate && endDate) {
      queryBuilder.andWhere('event.eventStartDateTime BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    // Apply location filter
    if (location) {
      queryBuilder.andWhere('event.eventLocation ILIKE :location', {
        location: `%${location}%`,
      });
    }

    // Apply venue filter
    if (venue) {
      queryBuilder.andWhere('event.eventVenue ILIKE :venue', {
        venue: `%${venue}%`,
      });
    }

    // Apply sorting
    queryBuilder.orderBy(`event.${sortBy}`, sortOrder);

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Get total count
    const total = await queryBuilder.getCount();

    // Get events
    const events = await queryBuilder.getMany();

    return { events, total };
  }
}
