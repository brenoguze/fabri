import { Test, TestingModule } from '@nestjs/testing';
import { CasitaService } from './casita.service.js';

describe('CasitaService', () => {
  let service: CasitaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasitaService],
    }).compile();

    service = module.get<CasitaService>(CasitaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
