import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {phone: dto.phone},
            omit: {password: false},
        });

        if (!user){
            throw new UnauthorizedException(`Usuário ou senha inválidos.`);
        }

        const checkPassword = await compare(dto.password, user.password);

        if (!checkPassword){
            throw new UnauthorizedException(`Usuário ou senha inválidos.`);
        }

        const payload = {
            sub: user.id,
        };

        const accessToken = await this.jwt.signAsync(payload);

        return {
            token: accessToken,
        };
    }
}