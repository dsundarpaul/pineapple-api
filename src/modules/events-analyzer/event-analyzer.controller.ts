import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EventAnalyzerService } from './event-analyzer.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../@core/auth/guards/jwt-auth.guard';

@ApiTags('event-analyzer')
@Controller('event-analyzer')
export class EventAnalyzerController {
  constructor(private readonly eventAnalyzerService: EventAnalyzerService) {}

  @UseGuards(AuthGuard)
  @Get()
  getEventList() {
    return this.eventAnalyzerService.getData();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventAnalyzerService.getData();
  }
}
