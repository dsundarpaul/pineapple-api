import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAnalyzerController } from './event-analyzer.controller';
import { EventAnalyzerService } from './event-analyzer.service';
import { Event } from './entities/events.entity';
import { Speaker } from './entities/speaker.entity';
import { Product } from '../products/entities/product.entity';
import { UserModule } from '../user/user.module';
import { EventRepository } from './repository/events.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Speaker, Product]),
    UserModule
  ],
  controllers: [EventAnalyzerController],
  providers: [EventAnalyzerService, EventRepository],
  exports: [EventAnalyzerService],
})
export class EventAnalyzerModule {}
