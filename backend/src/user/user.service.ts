import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';

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

    this.validatePasswordContent(dto.password, dto.name, dto.phone);

    const hashedPassword = await hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        password: hashedPassword,
      },
    });
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

    if (dto.phone) {
      const existingPhone = await this.prisma.user.findFirst({
        where: {
          phone: dto.phone,
          NOT: { id },
        },
      });

      if (existingPhone) {
        throw new ConflictException('Número de telefone já cadastrado.');
      }
    }

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

  async changePassword(id: string, dto: ChangePasswordDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: false },
    });

    if (!existingUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    const checkPassword = await compare(dto.currentPassword, existingUser.password);

    if (!checkPassword) {
      throw new BadRequestException('Senha atual incorreta.');
    }

    const equalPassword = await compare(dto.newPassword, existingUser.password);

    if (equalPassword) {
      throw new BadRequestException('A nova senha não deve ser igual a atual.');
    }

    this.validatePasswordContent(dto.newPassword, existingUser.name, existingUser.phone);

    const hashedPassword = await hash(dto.newPassword, 10);

    return this.prisma.user.update({
      where: {id},
      data: {
        password: hashedPassword
      }
    });
  }

  private validatePasswordContent(
    password: string,
    name: string,
    phone: string,
  ) {
    const lowerPassword = password.toLowerCase();
    const nameParts = name
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((part) => part.length >= 3);

    const phoneDigits = phone.slice(-8);

    const containsName = nameParts.some((part) => lowerPassword.includes(part));
    const containsPhone = lowerPassword.includes(phoneDigits);

    if (containsName || containsPhone) {
      throw new BadRequestException(
        'Sua senha não pode conter o seu nome ou o seu número de telefone.',
      );
    }
  }
}
