import { IsNotEmpty } from "class-validator";

export class RolDTO {

  @IsNotEmpty()
  nombre: string;
}
