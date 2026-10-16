import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (existingUser) {
      throw new ConflictException('Número de telefone já cadastrado.');
    }

    const password = dto.password.toLowerCase();
    const nameParts = dto.name
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((name) => name.length >= 3);

    const phoneDigits = dto.phone.slice(-8);

    const containsName = nameParts.some((name) => password.includes(name));
    const containsPhone = password.includes(phoneDigits);

    if (containsName || containsPhone) {
      throw new BadRequestException(
        'Sua senha não pode conter o seu nome ou o seu número de telefone.',
      );
    }

    const hashedPassword = await hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        phone: dto.phone,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
