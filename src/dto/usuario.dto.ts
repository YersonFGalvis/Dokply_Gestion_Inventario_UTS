import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { RoleType } from "../helpers/enums";


export class UsuarioDTO {

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  pass: string;

  @IsNotEmpty()
  @IsEnum(RoleType)
  rol: RoleType;
}


