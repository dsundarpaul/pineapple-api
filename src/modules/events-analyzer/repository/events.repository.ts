import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "../dto/create-event.dto";
import { Event } from "../entities/events.entity";
import { Product } from "@/modules/products/entities/product.entity";
import { User } from "@/modules/user/entities/user.entity";

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
}
