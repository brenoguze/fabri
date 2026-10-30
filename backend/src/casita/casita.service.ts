import { Injectable } from '@nestjs/common';
import { CreateCasitaDto } from './dto/create-casita.dto.js';
import { UpdateCasitaDto } from './dto/update-casita.dto.js';

@Injectable()
export class CasitaService {
  create(createCasitaDto: CreateCasitaDto) {
    return 'This action adds a new casita';
  }

  findAll() {
    return `This action returns all casita`;
  }

  findOne(id: number) {
    return `This action returns a #${id} casita`;
  }

  update(id: number, updateCasitaDto: UpdateCasitaDto) {
    return `This action updates a #${id} casita`;
  }

  remove(id: number) {
    return `This action removes a #${id} casita`;
  }
}
