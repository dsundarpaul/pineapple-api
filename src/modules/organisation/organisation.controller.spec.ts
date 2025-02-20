import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';

describe('OrganisationController', () => {
  let controller: OrganisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationController],
      providers: [OrganisationService],
    }).compile();

    controller = module.get<OrganisationController>(OrganisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
