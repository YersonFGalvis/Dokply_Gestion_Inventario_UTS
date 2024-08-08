import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SoftwareDTO {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    nombre: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    version: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    licencia: string;
}