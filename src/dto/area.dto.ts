import { IsNotEmpty, IsString } from 'class-validator';

export class AreaDTO {
    @IsNotEmpty()
    @IsString()
    nombre: string;
}