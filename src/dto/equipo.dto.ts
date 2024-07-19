import { IsNotEmpty, IsString, Length } from 'class-validator';

export class EquipoDTO {
    @IsNotEmpty()
    aula_id: number;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    estado: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    marca: string;
}