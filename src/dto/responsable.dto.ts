import { IsNotEmpty, IsString } from 'class-validator';

export class ResponsableDTO {
    @IsNotEmpty()
    cargo_id: number;

    @IsNotEmpty()
    @IsString()
    nombres: string;
  
    @IsNotEmpty()
    @IsString()
    apellidos: string;
  
    @IsNotEmpty()
    @IsString()
    telefono: string;
  
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    numeroidentificacion: string;
  
    @IsNotEmpty()
    @IsString()
    genero: string;
}