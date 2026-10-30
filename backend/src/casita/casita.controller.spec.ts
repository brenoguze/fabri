import { Test, TestingModule } from '@nestjs/testing';
import { CasitaController } from './casita.controller.js';
import { CasitaService } from './casita.service.js';

describe('CasitaController', () => {
  let controller: CasitaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasitaController],
      providers: [CasitaService],
    }).compile();

    controller = module.get<CasitaController>(CasitaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
