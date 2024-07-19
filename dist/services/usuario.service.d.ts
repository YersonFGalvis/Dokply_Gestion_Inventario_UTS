import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { UsuarioDTO } from "../dto/usuario.dto";
import { Usuario } from "../entity";
import { RolService } from "./rol.service";
export declare class UsuarioService extends BaseService<Usuario> {
    private readonly rolService;
    constructor(rolService?: RolService);
    findAllUser(): Promise<Usuario[]>;
    findById(id: number): Promise<Usuario | null>;
    findByEmail(email: string): Promise<Usuario | null>;
    findPasswordByEmail(email: string): Promise<Usuario | null>;
    findPasswordByUsername(nombre: string): Promise<Usuario | null>;
    createUser(body: UsuarioDTO): Promise<Usuario>;
    deleteUser(id: number): Promise<DeleteResult>;
    updateUser(id: number, infoUpdate: UsuarioDTO): Promise<UpdateResult>;
    findUserWithRole(id: number): Promise<Usuario | null>;
}
