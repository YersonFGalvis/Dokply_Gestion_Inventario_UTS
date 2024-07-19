import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Equipo, Aula } from "../entity";
import { EquipoDTO } from "../dto/equipo.dto";
import { AulaService } from "./aula.service";

export class EquipoService extends BaseService<Equipo> {
    constructor(private readonly _aulaService: AulaService = new AulaService()) {
        super(Equipo);
    }

    async findEquipoById(id: number): Promise<Equipo | null> {
        const repository = await this.getRepository();
        return repository
            .createQueryBuilder('equipo')
            .leftJoinAndSelect('equipo.aula_id', 'aula')
            .leftJoinAndSelect('aula.edificio_id', 'edificio')
            .where('equipo.id = :id', { id })
            .getOne();
    }

    async createEquipo(equipoDTO: EquipoDTO): Promise<Equipo> {
        const { aula_id, estado, marca } = equipoDTO;

        const aula: Aula | null = await this._aulaService.findAulaById(aula_id);

        if (!aula) {
            throw new Error(`Aula con id ${aula_id} no encontrada`);
        }

        const newEquipo = new Equipo();
        newEquipo.aula_id = aula;
        newEquipo.estado = estado;
        newEquipo.marca = marca;

        try {
            const repository = await this.getRepository();
            return await repository.save(newEquipo);
        } catch (error) {
            console.error('Error al crear el equipo:', error);
            throw error;
        }
    }

    async findAllEquipos(): Promise<Equipo[]> {
        const repository = await this.getRepository();
        return repository.find({ relations: ['aula_id'] });
    }

    async updateEquipo(id: number, equipoDTO: EquipoDTO): Promise<Equipo | null> {
        const repository = await this.getRepository();
        const equipoToUpdate = await repository.findOneBy({ id });

        if (!equipoToUpdate) {
            throw new Error(`Equipo con id ${id} no encontrado`);
        }

        const aula: Aula | null = await this._aulaService.findAulaById(equipoDTO.aula_id);

        if (!aula) {
            throw new Error(`Aula con id ${equipoDTO.aula_id} no encontrada`);
        }

        repository.merge(equipoToUpdate, {
            aula_id: aula,
            estado: equipoDTO.estado,
            marca: equipoDTO.marca
        });

        try {
            return await repository.save(equipoToUpdate);
        } catch (error) {
            console.error('Error al actualizar el equipo:', error);
            throw error;
        }
    }

    async deleteEquipo(id: number): Promise<void> {
        const repository = await this.getRepository();
        const equipoToDelete = await repository.findOneBy({ id });

        if (!equipoToDelete) {
            throw new Error(`Equipo con id ${id} no encontrado`);
        }

        try {
            await repository.remove(equipoToDelete);
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
            throw error;
        }
    }
}
