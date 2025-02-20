import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { OrganisationRepository } from './repository/organisation.repository';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(
    private readonly _organisationRepository: OrganisationRepository
  ) {}

  private readonly logger = new Logger(OrganisationService.name);

  async create(createOrganisationDto: CreateOrganisationDto) {
    this.logger.log({
      module: 'organisation',
      class: 'OrganisationService',
      method: 'create',
      info: 'Organisation creation started',
    });

    const createdOrganisation = await this._organisationRepository.createOrganisation(createOrganisationDto);

    this.logger.log({
      module: 'organisation',
      class: 'OrganisationService',
      method: 'create',
      info: 'Organisation creation completed',
      data: createdOrganisation
    });
    
    return createdOrganisation;
  }

  async findOne(id: string) {
    this.logger.log({
      module: 'organisation',
      class: 'OrganisationService',
      method: 'findOne',
      info: 'Finding organisation by id',
      data: { id }
    });

    const organisation = await this._organisationRepository.findOne(id);
    
    if (!organisation) {
      throw new NotFoundException(`Organisation with ID "${id}" not found`);
    }

    return organisation;
  }

  async update(id: string, updateOrganisationDto: UpdateOrganisationDto) {
    this.logger.log({
      module: 'organisation',
      class: 'OrganisationService',
      method: 'update',
      info: 'Updating organisation',
      data: { id, updateOrganisationDto }
    });

    const existingOrganisation = await this.findOne(id);

    const updatedOrganisation = await this._organisationRepository.update(id, {
      ...existingOrganisation,
      ...updateOrganisationDto,
    });

    this.logger.log({
      module: 'organisation',
      class: 'OrganisationService',
      method: 'update',
      info: 'Organisation updated successfully',
      data: updatedOrganisation
    });

    return updatedOrganisation;
  }

  async remove(id: string) {
    this.logger.log({
      module: 'organisation',
      class: 'OrganisationService',
      method: 'remove',
      info: 'Removing organisation',
      data: { id }
    });

    await this.findOne(id); // Verify organisation exists
    await this._organisationRepository.remove(id);

    this.logger.log({
      module: 'organisation',
      class: 'OrganisationService',
      method: 'remove',
      info: 'Organisation removed successfully',
      data: { id }
    });
  }
}
