import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { SetupController } from './setup.controller';

@Module({
  controllers: [SetupController],
  providers: [SetupService],
})
export class SetupModule {}
