import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class HardwareDTO {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    nombre: string;
  
    @IsOptional()
    @IsString()
    descripcion?: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    estado: string;
  
    @IsNotEmpty()
    equipo_id: number;
}