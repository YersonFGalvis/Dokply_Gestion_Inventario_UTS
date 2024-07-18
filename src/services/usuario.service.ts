import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { UsuarioDTO } from "../dto/usuario.dto";
import { Usuario } from "../entity";
import bcrypt from 'bcrypt';
import { RolService } from "./rol.service";

export class UsuarioService extends BaseService<Usuario> {
    constructor(private readonly rolService: RolService = new RolService()) {
        super(Usuario);
    }

    async findAllUser(): Promise<Usuario[]> {
        const repository = await this.getRepository();
        return repository.find({ relations: ['rol_id'] });
    }

    async findById(id: number): Promise<Usuario | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ email });
    }

    async findPasswordByEmail(email: string): Promise<Usuario | null> {
        const repository = await this.getRepository();
        return repository
            .createQueryBuilder("usuario")
            .addSelect("usuario.pass")
            .where("usuario.email = :email", { email })
            .getOne();
    }

    async findPasswordByUsername(nombre: string): Promise<Usuario | null> {
        const repository = await this.getRepository();
        return repository
            .createQueryBuilder("usuario")
            .addSelect("usuario.pass")
            .where("usuario.nombre = :nombre", { nombre })
            .getOne();
    }

    async createUser(body: UsuarioDTO): Promise<Usuario> {
        const repository = await this.getRepository();
        const newUser = repository.create(body);
        newUser.pass = await bcrypt.hash(newUser.pass, 10);
        newUser.rol_id = body.rol;
        return repository.save(newUser);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        const repository = await this.getRepository();
        return repository.delete(id);
    }

    async updateUser(id: number, infoUpdate: UsuarioDTO): Promise<UpdateResult> {
        const repository = await this.getRepository();
        return repository.update(id, infoUpdate);
    }

    async findUserWithRole(id: number): Promise<Usuario | null> {
        const repository = await this.getRepository();
        return repository
            .createQueryBuilder("usuario")
            .leftJoinAndSelect("usuario.rol_id", "rol")
            .where("usuario.id = :id", { id })
            .getOne();
    }
}
