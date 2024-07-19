import { IsNotEmpty, IsString } from 'class-validator';

export class CargoDTO{
    @IsNotEmpty()
    area_id: number;
  
    @IsNotEmpty()
    @IsString()
    nombre: string;
}