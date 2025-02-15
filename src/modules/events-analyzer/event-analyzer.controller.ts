import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventAnalyzerService } from './event-analyzer.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event-analyzer')
@Controller('event-analyzer')
export class EventAnalyzerController {
  constructor(private readonly eventAnalyzerService: EventAnalyzerService) {}

  @Get()
  getEventList() {
    return this.eventAnalyzerService.getData();
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventAnalyzerService.getData();
  }
}
