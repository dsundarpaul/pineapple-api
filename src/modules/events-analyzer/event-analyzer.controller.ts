import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { EventAnalyzerService } from './event-analyzer.service';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClerkAuthGuard } from '../@core/clerk/guards/clerk-auth.guard';
import { Request } from 'express';

@ApiTags('event-analyzer')
@Controller('events')
@UseGuards(ClerkAuthGuard)
export class EventAnalyzerController {
  constructor(private readonly eventAnalyzerService: EventAnalyzerService) {}

  @Get('products/:productId')
  @ApiOperation({ summary: 'Get all events for a product with filters' })
  @ApiResponse({ status: 200, description: 'Returns paginated events with filters' })
  async getAllEvents(
    @Param('productId') productId: string,
    @Query() queryParams: QueryEventsDto,
  ) {
    return this.eventAnalyzerService.getAllEvents(productId, queryParams);
  }

  @Post('products/:productId')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    console.assert(req.auth.userId, 'User id not found in request');
    return this.eventAnalyzerService.createEvent(
      createEventDto,
      productId,
      req.auth.userId,
    );
  }
}
