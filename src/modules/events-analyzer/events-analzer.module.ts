import { Module } from '@nestjs/common';
import { EventAnalyzerService } from './event-analyzer.service';
import { EventAnalyzerController } from './event-analyzer.controller';
import { EventRepository } from './repository/events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Event } from './entities/events.entity';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ProductsModule, 
    UserModule, 
    TypeOrmModule.forFeature([Event, Product, User])
  ],
  controllers: [EventAnalyzerController],
  providers: [EventAnalyzerService, EventRepository],
})
export class EventAnalyzerModule {}
