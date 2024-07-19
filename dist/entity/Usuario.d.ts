import { BaseEntity } from 'typeorm';
import { RoleType } from '../helpers/enums';
import { RegistroMantenimiento } from './RegistroMantenimiento';
export declare class Usuario extends BaseEntity {
    id: number;
    nombre: string;
    email: string;
    pass: string;
    rol_id: RoleType;
    registroMantenimientos: RegistroMantenimiento[];
}
