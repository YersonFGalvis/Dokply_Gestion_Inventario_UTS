import { BaseService } from "../config/serviceConfiguration";
import { Rol } from "../entity";
import { RolDTO } from "../dto/rol.dto";
import { Repository } from "typeorm";

export class RolService extends BaseService<Rol> {
    constructor() {
        super(Rol);
    }

    async findRolById(id: number): Promise<Rol | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async findRolByNombre(nombre: string): Promise<Rol | null> {
        const repository = await this.getRepository();
        return repository.findOne({ where: { nombre } });
    }

    async createRol(body: RolDTO): Promise<Rol> {
        const repository = await this.getRepository();
        const newRol = repository.create(body);
        return repository.save(newRol);
    }

    async updateRol(id: number, rolDTO: RolDTO): Promise<Rol | null> {
        const repository = await this.getRepository();
        let rolToUpdate = await repository.findOneBy({ id });

        if (!rolToUpdate) {
            throw new Error(`Rol con id ${id} no encontrado`);
        }

        repository.merge(rolToUpdate, rolDTO);

        try {
            await repository.save(rolToUpdate);
            return rolToUpdate;
        } catch (error) {
            console.error('Error al actualizar el Rol:', error);
            throw error;
        }
    }

    async deleteRol(id: number): Promise<void> {
        const repository = await this.getRepository();
        const rolToDelete = await repository.findOneBy({ id });

        if (!rolToDelete) {
            throw new Error(`Rol con id ${id} no encontrado`);
        }

        try {
            await repository.remove(rolToDelete);
        } catch (error) {
            console.error('Error al eliminar el Rol:', error);
            throw error;
        }
    }

    async findAllRols(): Promise<Rol[]> {
        const repository = await this.getRepository();
        return repository.find();
    }
}
