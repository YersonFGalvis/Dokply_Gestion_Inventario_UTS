import { IsNotEmpty } from 'class-validator';

export class EquipoHardwareDTO {

  @IsNotEmpty()
  equipo_id: number;

  @IsNotEmpty()
  hardware_id: number;
}
