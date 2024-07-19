import { IsNotEmpty, IsString, Length } from 'class-validator';


export class TipoMantenimientoDTO{
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    nombre: string;
}