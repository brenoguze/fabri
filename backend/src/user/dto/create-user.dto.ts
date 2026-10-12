import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength } from 'class-validator';

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
}