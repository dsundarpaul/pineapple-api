import { Module } from '@nestjs/common';
import { EventAnalyzerService } from './event-analyzer.service';
import { EventAnalyzerController } from './event-analyzer.controller';

@Module({
  controllers: [EventAnalyzerController],
  providers: [EventAnalyzerService]
})
export class EventAnalyzerModule {}
