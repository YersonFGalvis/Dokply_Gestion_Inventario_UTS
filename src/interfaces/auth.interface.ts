import { RoleType } from "../helpers/enums";

export interface PayloadToken {
    rol_id: RoleType,
    id: number;
}

export interface UserPayload {
    usuario_id: number;
    rol: RoleType;
  }