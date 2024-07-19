import { BaseService } from "../config/serviceConfiguration";
import { Rol } from "../entity";
import { RolDTO } from "../dto/rol.dto";
export declare class RolService extends BaseService<Rol> {
    constructor();
    findRolById(id: number): Promise<Rol | null>;
    findRolByNombre(nombre: string): Promise<Rol | null>;
    createRol(body: RolDTO): Promise<Rol>;
    updateRol(id: number, rolDTO: RolDTO): Promise<Rol | null>;
    deleteRol(id: number): Promise<void>;
    findAllRols(): Promise<Rol[]>;
}
