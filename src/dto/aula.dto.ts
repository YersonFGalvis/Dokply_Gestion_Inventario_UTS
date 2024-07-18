import { IsNotEmpty, IsString } from 'class-validator';


export class AulaDTO{
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  edificio_id: number;
}