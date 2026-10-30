import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CasitaService } from './casita.service.js';
import { CreateCasitaDto } from './dto/create-casita.dto.js';
import { UpdateCasitaDto } from './dto/update-casita.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@UseGuards(AuthGuard)
@Controller('casitas')
export class CasitaController {
  constructor(private readonly casitaService: CasitaService) {}

  @Post()
  create(@Body() createCasitaDto: CreateCasitaDto) {
    return this.casitaService.create(createCasitaDto);
  }

  @Get()
  findAll() {
    return this.casitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casitaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCasitaDto: UpdateCasitaDto) {
    return this.casitaService.update(+id, updateCasitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casitaService.remove(+id);
  }
}
