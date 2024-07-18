import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Cargo, Area } from "../entity";
import { CargoDTO } from "../dto/cargo.dto";
import { AreaService } from "./area.service";

export class CargoService extends BaseService<Cargo> {
    constructor(private readonly _areaService: AreaService = new AreaService()) {
        super(Cargo);
    }

    async findCargoById(id: number): Promise<Cargo | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createCargo(cargoDTO: CargoDTO): Promise<Cargo> {
        const { area_id, nombre } = cargoDTO;

        const area: Area | null = await this._areaService.findAreaById(area_id);

        if (!area) {
            throw new Error(`Área con id ${area_id} no encontrada`);
        }

        const newCargo = new Cargo();
        newCargo.area_id = area;
        newCargo.nombre = nombre;

        try {
            const repository = await this.getRepository();
            return await repository.save(newCargo);
        } catch (error) {
            console.error('Error al crear el cargo:', error);
            throw error;
        }
    }

    async findCargoByNombre(nombre: string): Promise<Cargo | null> {
        const repository = await this.getRepository();
        return repository.findOne({ where: { nombre } });
    }

    async findAllCargos(): Promise<Cargo[]> {
        const repository = await this.getRepository();
        return repository.find({ relations: ['area_id'] });
    }

    async updateCargo(id: number, cargoDTO: CargoDTO): Promise<Cargo | null> {
        const repository = await this.getRepository();
        const cargoToUpdate = await repository.findOneBy({ id });

        if (!cargoToUpdate) {
            throw new Error(`Cargo con id ${id} no encontrado`);
        }

        const area: Area | null = await this._areaService.findAreaById(cargoDTO.area_id);

        if (!area) {
            throw new Error(`Área con id ${cargoDTO.area_id} no encontrada`);
        }

        repository.merge(cargoToUpdate, {
            area_id: area,
            nombre: cargoDTO.nombre
        });

        try {
            return await repository.save(cargoToUpdate);
        } catch (error) {
            console.error('Error al actualizar el cargo:', error);
            throw error;
        }
    }

    async deleteCargo(id: number): Promise<void> {
        const repository = await this.getRepository();
        const cargoToDelete = await repository.findOneBy({ id });

        if (!cargoToDelete) {
            throw new Error(`Cargo con id ${id} no encontrado`);
        }

        try {
            await repository.remove(cargoToDelete);
        } catch (error) {
            console.error('Error al eliminar el cargo:', error);
            throw error;
        }
    }
}
