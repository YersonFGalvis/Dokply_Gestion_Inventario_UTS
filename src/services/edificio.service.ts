import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Edificio } from "../entity";
import { EdificioDTO } from "../dto/edificio.dto";

export class EdificioService extends BaseService<Edificio> {
    constructor() {
        super(Edificio);
    }

    async findEdificioById(id: number): Promise<Edificio | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createEdificio(body: EdificioDTO): Promise<Edificio> {
        const repository = await this.getRepository();
        const newEdificio = repository.create(body);
        const edificioInserted = await repository.save(newEdificio);
        return edificioInserted;
    }

    async findEdificioByNombre(nombre: string): Promise<Edificio | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ nombre });
    }

    async findAllEdificios(): Promise<Edificio[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateEdificio(id: number, edificioDTO: EdificioDTO): Promise<Edificio | null> {
        const repository = await this.getRepository();
        const edificioToUpdate = await repository.findOneBy({ id });

        if (!edificioToUpdate) {
            throw new Error(`Edificio con id ${id} no encontrado`);
        }

        repository.merge(edificioToUpdate, edificioDTO);

        try {
            return await repository.save(edificioToUpdate);
        } catch (error) {
            console.error('Error al actualizar el edificio:', error);
            throw error;
        }
    }

    async deleteEdificio(id: number): Promise<void> {
        const repository = await this.getRepository();
        const edificioToDelete = await repository.findOneBy({ id });

        if (!edificioToDelete) {
            throw new Error(`Edificio con id ${id} no encontrado`);
        }

        try {
            await repository.remove(edificioToDelete);
        } catch (error) {
            console.error('Error al eliminar el edificio:', error);
            throw error;
        }
    }
}
