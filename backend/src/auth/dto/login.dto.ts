import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O número de celular não pode estar vazio' })
  @IsString({ message: 'Número inválido.' })
  phone: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @IsString({ message: 'Senha inválida.' })
  @MaxLength(50, { message: 'Sua senha pode ter no máximo 50 caracteres.' })
  password: string;
}
