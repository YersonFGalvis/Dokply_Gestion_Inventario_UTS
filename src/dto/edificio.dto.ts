import { IsNotEmpty, IsString } from 'class-validator';


export class EdificioDTO{
    @IsNotEmpty()
    @IsString()
    nombre: string;
  
    @IsNotEmpty()
    @IsString()
    letra: string;
}