import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventRepository } from './repository/events.repository';
import { DataSource } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { UserService } from '../user/user.service';

@Injectable()
export class EventAnalyzerService {
  constructor(
    private readonly _eventRepository: EventRepository,
    private readonly _productService: ProductsService,
    private readonly _userService: UserService,
    private dataSource: DataSource
  ) {}

  private readonly logger = new Logger(EventAnalyzerService.name);

  async getEventList(productId) {
    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'getEventList',
      info: 'Getting event list',
    })

    const events = await this._eventRepository.getEventList(productId);

    return events;
  }

  async createEvent(createEventDto: CreateEventDto, productId: string, userId: string) {
    this.logger.log({
      module: 'events-analyzer',
      class: 'EventAnalyzerService',
      method: 'createEvent',
      info: 'Creating event',
    }) 

    const product = await this._productService.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const user = await this._userService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }


    const createdEvent = await this._eventRepository.createEvent(createEventDto, product, user);

    return createdEvent;
  }
}
