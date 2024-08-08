import { IsNotEmpty } from 'class-validator';

export class EquipoSoftwareDTO {

  @IsNotEmpty()
  equipo_id: number;

  @IsNotEmpty()
  software_id: number;
}
