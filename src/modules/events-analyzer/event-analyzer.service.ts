import { Injectable } from '@nestjs/common';

@Injectable()
export class EventAnalyzerService {
  getData(): { message: string } {
    return { message: "pineapple-api" };
  }
}
