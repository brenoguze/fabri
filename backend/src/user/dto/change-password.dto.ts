import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'A sua senha não pode estar vazia.' })
  @IsString({ message: 'Senha inválida.' })
  @MaxLength(50, {
    message: 'Sua senha pode ter no máximo 50 caracteres.',
  })
  currentPassword: string;

  @IsNotEmpty({ message: 'A sua nova senha não pode estar vazia.' })
  @IsString({ message: 'Senha inválida.' })
  @MinLength(8, { message: 'Sua senha precisa ter pelo menos 8 caracteres.' })
  @Matches(/[A-Z]/, {
    message: 'Sua senha precisa ter pelo menos 1 letra maiúscula.',
  })
  @Matches(/[0-9]/, { message: 'Sua senha precisa ter pelo menos 1 número.' })
  @Matches(/[^a-zA-Z0-9]/, {
    message: 'Sua senha precisa ter pelo menos 1 caractere especial',
  })
  @MaxLength(50, { message: 'Sua senha pode ter no máximo 50 caracteres.' })
  newPassword: string;
}
