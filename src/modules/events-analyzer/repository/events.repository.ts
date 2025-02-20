import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "../entities/events.entities";
import { Repository } from "typeorm";

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly _eventRepository: Repository<Event>
  ) {}

  private readonly _logger = new Logger(EventRepository.name)

  async createEvent() {}

  async getEventsByProductId(productId: string): Promise<Event[]> {
    try {
      return await this._eventRepository.find({
        where: {
          product: { id: productId}
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
}