import { IsNotEmpty, IsDate, IsOptional } from 'class-validator';


export class RegistroMantenimientoDTO {

  @IsNotEmpty()
  equipo_id: number;

  @IsNotEmpty()
  tipo_mantenimiento_id: number;

  @IsNotEmpty()
  @IsDate()
  fecha: Date;

  @IsOptional()
  detalle: string;

  @IsNotEmpty()
  usuario_id: number;
}
