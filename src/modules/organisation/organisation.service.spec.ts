import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationService } from './organisation.service';
import { OrganisationRepository } from './repository/organisation.repository';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { Logger } from '@nestjs/common';

describe('OrganisationService', () => {
  let service: OrganisationService;
  let repository: OrganisationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganisationService,
        {
          provide: OrganisationRepository,
          useValue: {
            createOrganisation: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrganisationService>(OrganisationService);
    repository = module.get<OrganisationRepository>(OrganisationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
    it('should create a organisation and return it', async () => {
      const createOrganisationDto: CreateOrganisationDto = { organisationName: 'Test Organisation', authorId: '2', domain: 'soli' };
      const createdOrganisation = { id: 1, ...createOrganisationDto };

      jest.spyOn(repository, 'createOrganisation').mockResolvedValue(createdOrganisation);
      const loggerSpy = jest.spyOn(Logger.prototype, 'log');

      const result = await service.create(createOrganisationDto);

      expect(repository.createOrganisation).toHaveBeenCalledWith(createOrganisationDto);
      expect(result).toEqual(createdOrganisation);
      expect(loggerSpy).toHaveBeenCalledTimes(2);
    });
  // });
});
