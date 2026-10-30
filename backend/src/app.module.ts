import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CasitaModule } from './casita/casita.module.js';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, CasitaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}