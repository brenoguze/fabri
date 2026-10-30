import { PartialType } from '@nestjs/mapped-types';
import { CreateCasitaDto } from './create-casita.dto.js';

export class UpdateCasitaDto extends PartialType(CreateCasitaDto) {}
