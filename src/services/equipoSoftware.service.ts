import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { EquipoSoftware } from "../entity/EquipoSoftware";
import { EquipoSoftwareDTO } from "../dto/equipoSoftware.dto";
import { EquipoService } from "./equipo.service";
import { SoftwareService } from "./software.service";
import { Equipo } from "../entity/Equipo";
import { Software } from "../entity/Software";

export class EquipoSoftwareService extends BaseService<EquipoSoftware> {
    constructor(
        private readonly _equipoService: EquipoService = new EquipoService(),
        private readonly _softwareService: SoftwareService = new SoftwareService()
    ) {
        super(EquipoSoftware);
    }

    async findAllEquiposSoftware(): Promise<EquipoSoftware[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async findEquipoSoftwareById(id: number): Promise<number[]> {
        const repository = await this.getRepository();
        const result = await repository
            .createQueryBuilder('equiposoftware')
            .select('equiposoftware.equipo_id')
            .where('equiposoftware.equipo_id = :id', { id })
            .getRawOne();

        return result ? result.equipo_id : null;
    }

    async createEquipoSoftware(equipoSoftwareDTO: EquipoSoftwareDTO): Promise<EquipoSoftware> {
        const { equipo_id, software_id } = equipoSoftwareDTO;

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);
        const software: Software | null = await this._softwareService.findSoftwareById(software_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }
        if (!software) {
            throw new Error(`Software con id ${software_id} no encontrado`);
        }

        const newEquipoSoftware = new EquipoSoftware();
        newEquipoSoftware.equipo_id = equipo;
        newEquipoSoftware.software_id = software;

        const repository = await this.getRepository();

        try {
            return await repository.save(newEquipoSoftware);
        } catch (error) {
            console.error('Error al crear el equipo software:', error);
            throw error;
        }
    }

    async updateEquipoSoftware(id: number, equipoSoftwareDTO: EquipoSoftwareDTO): Promise<EquipoSoftware | null> {
        const repository = await this.getRepository();
        const equipoSoftwareToUpdate = await repository.findOneBy({ id });

        if (!equipoSoftwareToUpdate) {
            throw new Error(`EquipoSoftware con id ${id} no encontrado`);
        }

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipoSoftwareDTO.equipo_id);
        const software: Software | null = await this._softwareService.findSoftwareById(equipoSoftwareDTO.software_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipoSoftwareDTO.equipo_id} no encontrado`);
        }
        if (!software) {
            throw new Error(`Software con id ${equipoSoftwareDTO.software_id} no encontrado`);
        }

        repository.merge(equipoSoftwareToUpdate, {
            equipo_id: equipo,
            software_id: software
        });

        try {
            return await repository.save(equipoSoftwareToUpdate);
        } catch (error) {
            console.error('Error al actualizar el equipo software:', error);
            throw error;
        }
    }

    async deleteEquipoSoftware(id: number): Promise<EquipoSoftware[]> {
        const repository = await this.getRepository();
        const equipoHardwareToDelete = await repository.createQueryBuilder('es')
            .where('es.equipo_id = :id', { id })
            .getMany();

        if (equipoHardwareToDelete.length === 0) {
            throw new Error(`equipoHardwareToDelete con id ${id} no encontrado`);
        }

        try {
            await repository.createQueryBuilder()
                .delete()
                .from(EquipoSoftware)
                .where('equipo_id = :id', { id })
                .execute();

            return equipoHardwareToDelete;
        } catch (error) {
            console.error('Error al eliminar el equipo hardware:', error);
            throw error;
        }
    }
}
