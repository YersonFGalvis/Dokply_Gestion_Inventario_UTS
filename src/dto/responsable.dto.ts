import { IsNotEmpty, IsString } from 'class-validator';

export class ResponsableDTO {
    @IsNotEmpty()
    cargo_id: number;
  
    @IsNotEmpty()
    @IsString()
    nombre: string;
}