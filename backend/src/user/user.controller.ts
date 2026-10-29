import { Controller, Get, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findMe(@CurrentUser() userId: string) {
    return this.userService.findOne(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  update(@CurrentUser() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('me/password')
  changePassword(@CurrentUser() userId: string, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(userId, changePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  remove(@CurrentUser() userId: string) {
    return this.userService.remove(userId);
  }
}
