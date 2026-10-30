import { Module } from '@nestjs/common';
import { CasitaService } from './casita.service.js';
import { CasitaController } from './casita.controller.js';

@Module({
  controllers: [CasitaController],
  providers: [CasitaService],
})
export class CasitaModule {}
