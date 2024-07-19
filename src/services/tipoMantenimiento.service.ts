import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { TipoMantenimiento } from "../entity";
import { TipoMantenimientoDTO } from "../dto/tipoMantenimiento.dto";

export class TipoMantenimientoService extends BaseService<TipoMantenimiento> {
    constructor() {
        super(TipoMantenimiento);
    }

    async findTipoMantenimientoById(id: number): Promise<TipoMantenimiento | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createTipoMantenimiento(body: TipoMantenimientoDTO): Promise<TipoMantenimiento> {
        const repository = await this.getRepository();
        const newTipoMantenimiento = repository.create(body);
        return repository.save(newTipoMantenimiento);
    }

    async findTipoMantenimientoByNombre(nombre: string): Promise<TipoMantenimiento | null> {
        const repository = await this.getRepository();
        return repository.findOne({ where: { nombre } });
    }

    async findAllTipoMantenimientos(): Promise<TipoMantenimiento[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateTipoMantenimiento(id: number, tipoMantenimientoDTO: TipoMantenimientoDTO): Promise<TipoMantenimiento | null> {
        const repository = await this.getRepository();
        let tipoMantenimientoToUpdate = await repository.findOneBy({ id });

        if (!tipoMantenimientoToUpdate) {
            throw new Error(`Tipo de Mantenimiento con id ${id} no encontrado`);
        }

        repository.merge(tipoMantenimientoToUpdate, tipoMantenimientoDTO);

        try {
            await repository.save(tipoMantenimientoToUpdate);
            return tipoMantenimientoToUpdate;
        } catch (error) {
            console.error('Error al actualizar el Tipo de Mantenimiento:', error);
            throw error;
        }
    }

    async deleteTipoMantenimiento(id: number): Promise<void> {
        const repository = await this.getRepository();
        const tipoMantenimientoToDelete = await repository.findOneBy({ id });

        if (!tipoMantenimientoToDelete) {
            throw new Error(`Tipo de Mantenimiento con id ${id} no encontrado`);
        }

        try {
            await repository.remove(tipoMantenimientoToDelete);
        } catch (error) {
            console.error('Error al eliminar el Tipo de Mantenimiento:', error);
            throw error;
        }
    }
}
