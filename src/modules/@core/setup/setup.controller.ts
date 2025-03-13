import { Body, Controller, Post } from '@nestjs/common';
import { SetupService } from './setup.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('setup')
@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Post('init')
  async init(@Body() setupInitDto: Record<string, any>) {
    return this.setupService.init(setupInitDto);
  }

  @Post('migrate-permissions')
  async migratePermissions() { }
}
