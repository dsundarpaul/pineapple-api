import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Organisation } from "../entities/organisation.entity";
// import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class OrganisationRepository {
  constructor(
    @InjectRepository(Organisation)
    private readonly _organisationRepository: Repository<Organisation>,
    // private readonly _logger: LoggerService
  ) {}

  private readonly _logger = new Logger(OrganisationRepository.name);
  
  createOrganisation(createOrganisationDto: any): any {
    try {
      const newOrganisation = this._organisationRepository.create(createOrganisationDto);
      return this._organisationRepository.save(newOrganisation as Object);
    } catch (error) {
      this._logger.error({
        module: 'organisation',
        class: 'OrganisationRepository',
        method: 'createOrganisation',
        errorMessage: 'Db error while creating organisation',
        data: createOrganisationDto,
        context: error?.message
      });
    }
  }

  findByAuthorIdAndOrganisationName(authorId: string, name): any {
    try {
      const organisation = this._organisationRepository.find({ where: { authorId, organisationName: name } });
      console.assert(organisation, 'Organisation not found');
      return organisation;
    } catch (error) {
      this._logger.error({
        module: 'organisation',
        class: 'OrganisationRepository',
        method: 'findByAuthorIdAndOrganisationName',
        errorMessage: 'Db error while finding organisation by author id and organisation name',
        data: authorId,
        context: error?.message
      });
    }
  }

  findOne(id: string): any {
    try {
      const organisation = this._organisationRepository.findOne({ where: { id } });
      console.assert(organisation, 'Organisation not found');
      return organisation;
    } catch (error) {
      this._logger.error({
        module: 'organisation',
        class: 'OrganisationRepository',
        method: 'findOne',
        errorMessage: 'Db error while finding organisation by id',
        data: id,
        context: error?.message
      });
    }
  }

  update(id: string, updateOrganisationDto: any): any {
    try {
      return this._organisationRepository.save({
        id,
        ...updateOrganisationDto
      });
    } catch (error) {
      this._logger.error({
        module: 'organisation',
        class: 'OrganisationRepository',
        method: 'update',
        errorMessage: 'Db error while updating organisation',
        data: { id, updateOrganisationDto },
        context: error?.message
      });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this._organisationRepository.softDelete(id);
    } catch (error) {
      this._logger.error({
        module: 'organisation',
        class: 'OrganisationRepository',
        method: 'remove',
        errorMessage: 'Db error while removing organisation',
        data: id,
        context: error?.message
      });
    }
  }
}