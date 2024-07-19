import { IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class RegistroEquipoDTO {
    @IsNotEmpty()
    equipo_id: number;
  
    @IsNotEmpty()
    responsable_id: number;
  
    @IsNotEmpty()
    @IsDate()
    fecha_asignacion: Date;
  
    @IsOptional()
    @IsDate()
    fecha_devolucion?: Date | null;
}