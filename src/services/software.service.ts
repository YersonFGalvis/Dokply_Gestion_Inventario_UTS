import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Software, Equipo } from "../entity";
import { SoftwareDTO } from "../dto/software.dto";
import { EquipoService } from "./equipo.service";

export class SoftwareService extends BaseService<Software> {
    constructor(private readonly _equipoService: EquipoService = new EquipoService()) {
        super(Software);
    }

    async findSoftwareById(id: number): Promise<Software | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createSoftware(softwareDTO: SoftwareDTO): Promise<Software> {
        const { nombre, version, licencia, equipo_id } = softwareDTO;

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }

        const newSoftware = new Software();
        newSoftware.nombre = nombre;
        newSoftware.version = version;
        newSoftware.licencia = licencia;
        newSoftware.equipo_id = equipo;

        try {
            const repository = await this.getRepository();
            return await repository.save(newSoftware);
        } catch (error) {
            console.error('Error al crear el Software:', error);
            throw error;
        }
    }

    async findSoftwareByNombre(nombre: string): Promise<Software | null> {
        const repository = await this.getRepository();
        return repository.findOne({ where: { nombre } });
    }

    async findAllSoftwares(): Promise<Software[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateSoftware(id: number, softwareDTO: SoftwareDTO): Promise<Software | null> {
        const repository = await this.getRepository();
        let softwareToUpdate = await repository.findOneBy({ id });

        if (!softwareToUpdate) {
            throw new Error(`Responsable con id ${id} no encontrado`);
        }

        const { nombre, version, licencia, equipo_id } = softwareDTO;

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }

        repository.merge(softwareToUpdate,{
            nombre: nombre,
            version: version,
            licencia:licencia,
            equipo_id:equipo
        })

        try {
            return await repository.save(softwareToUpdate);
        } catch (error) {
            console.error(`Error al actualizar el software con id ${id}:`, error);
            throw error;
        }
    }

    async deleteSoftware(id: number): Promise<void> {
        const repository = await this.getRepository();
        const softwareToDelete = await repository.findOneBy({ id });

        if (!softwareToDelete) {
            throw new Error(`Software con id ${id} no encontrado`);
        }

        try {
            await repository.remove(softwareToDelete);
        } catch (error) {
            console.error(`Error al eliminar el software con id ${id}:`, error);
            throw error;
        }
    }
}
