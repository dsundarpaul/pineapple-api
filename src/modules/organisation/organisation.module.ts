import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { Organisation } from './entities/organisation.entity';
import { OrganisationController } from './organisation.controller';
import { OrganisationRepository } from './repository/organisation.repository';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organisation, User])
  ],
  controllers: [OrganisationController],
  providers: [
    OrganisationService,
    OrganisationRepository,
    Organisation,
    CreateOrganisationDto,
    UpdateOrganisationDto
  ],
})
export class OrganisationModule {}
