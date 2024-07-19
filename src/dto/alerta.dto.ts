import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class AlertaDTO {
    @IsNotEmpty()
    @IsString()
    tipo_alerta: string;

    @IsNotEmpty()
    @IsDateString()
    fecha_hora_generacion: Date;

    @IsNotEmpty()
    @IsString()
    estado: string;

    @IsNotEmpty()
    equipo_id: number;
}
