import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Aula, Edificio } from "../entity";
import { AulaDTO } from "../dto/aula.dto";
import { EdificioService } from "./edificio.service";

export class AulaService extends BaseService<Aula> {
    constructor(private readonly _edificioService: EdificioService = new EdificioService()) {
        super(Aula);
    }

    async findAulaById(id: number): Promise<Aula | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createAula(aulaDTO: AulaDTO): Promise<Aula> {
        const { edificio_id, nombre } = aulaDTO;

        const edificio: Edificio | null = await this._edificioService.findEdificioById(edificio_id);

        if (!edificio) {
            throw new Error(`Edificio con id ${edificio_id} no encontrado`);
        }

        const newAula = new Aula();
        newAula.edificio_id = edificio;
        newAula.nombre = nombre;

        try {
            const repository = await this.getRepository();
            return await repository.save(newAula);
        } catch (error) {
            console.error('Error al crear el aula:', error);
            throw error;
        }
    }

    async findAulaByNombre(nombre: string): Promise<Aula | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ nombre });
    }

    async findAllAulas(): Promise<Aula[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateAula(id: number, aulaDTO: AulaDTO): Promise<Aula | null> {
        const repository = await this.getRepository();
        const aulaToUpdate = await repository.findOneBy({ id });

        if (!aulaToUpdate) {
            throw new Error(`Aula con id ${id} no encontrada`);
        }

        const edificio: Edificio | null = await this._edificioService.findEdificioById(aulaDTO.edificio_id);

        if (!edificio) {
            throw new Error(`Edificio con id ${aulaDTO.edificio_id} no encontrado`);
        }

        repository.merge(aulaToUpdate, {
            edificio_id: edificio,
            nombre: aulaDTO.nombre
        });

        try {
            return await repository.save(aulaToUpdate);
        } catch (error) {
            console.error('Error al actualizar el aula:', error);
            throw error;
        }
    }

    async deleteAula(id: number): Promise<void> {
        const repository = await this.getRepository();
        const aulaToDelete = await repository.findOneBy({ id });

        if (!aulaToDelete) {
            throw new Error(`Aula con id ${id} no encontrada`);
        }

        try {
            await repository.remove(aulaToDelete);
        } catch (error) {
            console.error('Error al eliminar el aula:', error);
            throw error;
        }
    }
}
