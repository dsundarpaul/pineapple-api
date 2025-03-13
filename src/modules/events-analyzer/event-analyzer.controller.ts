import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EventAnalyzerService } from './event-analyzer.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../@core/auth/guards/jwt-auth.guard';

@ApiTags('event-analyzer')
@Controller('event-analyzer')
export class EventAnalyzerController {
  constructor(private readonly eventAnalyzerService: EventAnalyzerService) {}

  @UseGuards(AuthGuard)
  @Get(':productId')
  async getEventList(@Param('productId') productId: string) {
    return this.eventAnalyzerService.getEventList(productId);
  }

  @Get(':id')
  getEventDetails() {
    return {}
  }

  @UseGuards(AuthGuard)
  @Post(':productId')
  async create(
    @Body() createEventDto: CreateEventDto, 
    @Param('productId') productId: string,
    @Req() req: any 
  ) {
    console.log(req)
    const userId = '1234'; // get user id from token
    return this.eventAnalyzerService.createEvent(createEventDto, productId, userId);
  }
}
