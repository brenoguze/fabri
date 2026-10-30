import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCasitaDto {

    @IsNotEmpty({message: "O nome da Casita não pode estar vazio."})
    @MaxLength(50, {message: 'O nome deve ter no máximo 30 caracteres.'})
    name: string;
}