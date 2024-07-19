import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Responsable, Cargo } from "../entity";
import { ResponsableDTO } from "../dto/responsable.dto";
import { CargoService } from "./cargo.service";

export class ResponsableService extends BaseService<Responsable> {
    constructor(private readonly _cargoService: CargoService = new CargoService()) {
        super(Responsable);
    }

    async findResponsableById(id: number): Promise<Responsable | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createResponsable(responsableDTO: ResponsableDTO): Promise<Responsable> {
        const { cargo_id, nombre } = responsableDTO;
        
        const cargo: Cargo | null = await this._cargoService.findCargoById(cargo_id);

        if (!cargo) {
            throw new Error(`Cargo con id ${cargo_id} no encontrado`);
        }

        const newResponsable = new Responsable();
        newResponsable.cargo_id = cargo;
        newResponsable.nombre = nombre;

        try {
            const repository = await this.getRepository();
            return await repository.save(newResponsable);
        } catch (error) {
            console.error('Error al crear el Responsable:', error);
            throw error;
        } 
    }

    async findAllResponsables(): Promise<Responsable[]> {
        const repository = await this.getRepository();
        return repository.find({ relations: ['cargo_id'] });
    }

    async updateResponsable(id: number, responsableDTO: ResponsableDTO): Promise<Responsable | null> {
        const repository = await this.getRepository();
        let responsableToUpdate = await repository.findOneBy({ id });

        if (!responsableToUpdate) {
            throw new Error(`Responsable con id ${id} no encontrado`);
        }

        const { cargo_id, nombre } = responsableDTO;
        const cargo: Cargo | null = await this._cargoService.findCargoById(cargo_id);

        if (!cargo) {
            throw new Error(`Cargo con id ${cargo_id} no encontrado`);
        }

        repository.merge(responsableToUpdate, {
            cargo_id: cargo,
            nombre: nombre
        });

        try {
            await repository.save(responsableToUpdate);
            return responsableToUpdate;
        } catch (error) {
            console.error('Error al actualizar el Responsable:', error);
            throw error;
        }
    }

    async deleteResponsable(id: number): Promise<void> {
        const repository = await this.getRepository();
        const responsableToDelete = await repository.findOneBy({ id });

        if (!responsableToDelete) {
            throw new Error(`Responsable con id ${id} no encontrado`);
        }

        try {
            await repository.remove(responsableToDelete);
        } catch (error) {
            console.error('Error al eliminar el Responsable:', error);
            throw error;
        }
    }
}
