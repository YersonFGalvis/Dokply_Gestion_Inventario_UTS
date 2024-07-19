import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Area } from "../entity";
import { AreaDTO } from "../dto/area.dto";

export class AreaService extends BaseService<Area> {
    constructor() {
        super(Area);
    }

    async findAreaById(id: number): Promise<Area | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createArea(areaDTO: AreaDTO): Promise<Area> {
        const { nombre } = areaDTO;

        const newArea = new Area();
        newArea.nombre = nombre;

        try {
            const repository = await this.getRepository();
            return await repository.save(newArea);
        } catch (error) {
            console.error('Error al crear el área:', error);
            throw error;
        }
    }

    async findAreaByNombre(nombre: string): Promise<Area | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ nombre });
    }

    async findAllAreas(): Promise<Area[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateArea(id: number, areaDTO: AreaDTO): Promise<Area | null> {
        const repository = await this.getRepository();
        const areaToUpdate = await repository.findOneBy({ id });

        if (!areaToUpdate) {
            throw new Error(`Área con id ${id} no encontrada`);
        }

        repository.merge(areaToUpdate, { nombre: areaDTO.nombre });

        try {
            return await repository.save(areaToUpdate);
        } catch (error) {
            console.error('Error al actualizar el área:', error);
            throw error;
        }
    }

    async deleteArea(id: number): Promise<void> {
        const repository = await this.getRepository();
        const areaToDelete = await repository.findOneBy({ id });

        if (!areaToDelete) {
            throw new Error(`Área con id ${id} no encontrada`);
        }

        try {
            await repository.remove(areaToDelete);
        } catch (error) {
            console.error('Error al eliminar el área:', error);
            throw error;
        }
    }
}
