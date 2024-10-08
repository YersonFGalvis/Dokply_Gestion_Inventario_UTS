import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { RegistroEquipo, Equipo, Responsable } from "../entity";
import { EquipoService } from "./equipo.service";
import { ResponsableService } from "./responsable.service";
import { RegistroEquipoDTO } from "../dto/registroEquipo.dto";

export class RegistroEquipoService extends BaseService<RegistroEquipo> {
    constructor(
        private readonly _equipoService: EquipoService = new EquipoService(),
        private readonly _responsableService: ResponsableService = new ResponsableService(),
    ) {
        super(RegistroEquipo);
    }

    async findRegistroEquipoById(id: number): Promise<RegistroEquipo | null> {
        const repository = await this.getRepository();
        return repository
            .createQueryBuilder('registroEquipo')
            .leftJoinAndSelect('registroEquipo.responsable_id', 'responsable')
            .where('registroEquipo.equipo_id = :id', { id })
            .orderBy('registroEquipo.fecha_asignacion', 'DESC')
            .addOrderBy('registroEquipo.id', 'DESC')
            .getOne();
    }

    async createRegistroEquipo(registroEquipoDTO: RegistroEquipoDTO): Promise<RegistroEquipo> {
        const { equipo_id, responsable_id, fecha_asignacion, fecha_devolucion } = registroEquipoDTO;

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);
        const responsable: Responsable | null = await this._responsableService.findResponsableById(responsable_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }
        if (!responsable) {
            throw new Error(`Responsable con id ${responsable_id} no encontrado`);
        }

        const newRegistroEquipo = new RegistroEquipo();
        newRegistroEquipo.equipo_id = equipo;
        newRegistroEquipo.responsable_id = responsable;
        newRegistroEquipo.fecha_asignacion = new Date(fecha_asignacion);
        newRegistroEquipo.fecha_devolucion = fecha_devolucion ? new Date(fecha_devolucion) : null;

        try {
            const repository = await this.getRepository();
            return await repository.save(newRegistroEquipo);
        } catch (error) {
            console.error('Error al crear el Registro Equipo:', error);
            throw error;
        }
    }

    async findAllRegistroEquipos(): Promise<RegistroEquipo[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateRegistroEquipo(id: number, registroEquipoDTO: RegistroEquipoDTO): Promise<RegistroEquipo | null> {
        const repository = await this.getRepository();
        const registroEquipoToUpdate = await repository.findOneBy({ id });

        if (!registroEquipoToUpdate) {
            throw new Error(`RegistroEquipo con id ${id} no encontrado`);
        }

        // const equipo: Equipo | null = await this._equipoService.findEquipoById(registroEquipoDTO.equipo_id);
        // const responsable: Responsable | null = await this._responsableService.findResponsableById(registroEquipoDTO.responsable_id);

        // if (!equipo) {
        //     throw new Error(`Equipo con id ${registroEquipoDTO.equipo_id} no encontrado`);
        // }
        // if (!responsable) {
        //     throw new Error(`Responsable con id ${registroEquipoDTO.responsable_id} no encontrado`);
        // }

        repository.merge(registroEquipoToUpdate, {
            fecha_devolucion: new Date(new Date().setHours(0, 0, 0, 0))
        });

        try {
            return await repository.save(registroEquipoToUpdate);
        } catch (error) {
            console.error('Error al actualizar el registro de equipo:', error);
            throw error;
        }
    }

    async deleteRegistroEquipo(id: number): Promise<RegistroEquipo[]> {
        const repository = await this.getRepository();
        const registroEquipoToDelete = await repository.createQueryBuilder('re')
            .where('re.equipo_id = :id', { id })
            .getMany();

        if (!registroEquipoToDelete) {
            throw new Error(`RegistroEquipo con id ${id} no encontrado`);
        }

        try {
            await repository.createQueryBuilder()
            .delete()
            .from(RegistroEquipo)
            .where('equipo_id = :id', { id })
            .execute();

        return registroEquipoToDelete;
        } catch (error) {
            console.error('Error al eliminar el registro de equipo:', error);
            throw error;
        }
    }
}
