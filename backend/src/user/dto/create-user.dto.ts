import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty({message: 'O nome não pode estar vazio.'})
    @IsString({message: 'Nome inválido.'})
    @Matches(/^\p{L}[\p{L}\s'-]*$/u, {message: 'O nome deve conter apenas letras.'})
    @MaxLength(30, {message: 'O nome deve ter no máximo 30 caracteres.'})
    name: string;

    @IsNotEmpty({message: 'O número de celular não pode estar vazio.'})
    @Matches(/^\+[1-9]\d{7,14}$/, {message: 'Número inválido' })
    @IsPhoneNumber(undefined, {message: 'Número de telefone inválido.'})
    phone: string;

    @IsNotEmpty({message: 'A senha não pode estar vazia.'})
    @IsString({message: 'Senha inválida.'})
    @MinLength(8, {message: 'Sua senha precisa ter pelo menos 8 caracteres.'})
    @Matches(/[A-Z]/, {message: 'Sua senha precisa ter pelo menos 1 letra maiúscula.'})
    @Matches(/[0-9]/, {message: 'Sua senha precisa ter pelo menos 1 número.'})
    @Matches(/[^a-zA-Z0-9]/, {message: 'Sua senha precisa ter pelo menos 1 caractere especial'})
    @MaxLength(50, {message: 'Sua senha pode ter no máximo 50 caracteres.'})
    password: string;
}