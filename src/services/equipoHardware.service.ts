import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { EquipoHardware } from "../entity/EquipoHardware";
import { EquipoHardwareDTO } from "../dto/equipoHardware.dto";
import { EquipoService } from "./equipo.service";
import { HardwareService } from "./hardware.service";
import { Equipo } from "../entity/Equipo";
import { Hardware } from "../entity/Hardware";

export class EquipoHardwareService extends BaseService<EquipoHardware> {
    constructor(
        private readonly _equipoService: EquipoService = new EquipoService(),
        private readonly _hardwareService: HardwareService = new HardwareService()
    ) {
        super(EquipoHardware);
    }

    async findAllEquiposHardware(): Promise<EquipoHardware[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async findEquipoHardwareById(id: number): Promise<EquipoHardware | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createEquipoHardware(equipoHardwareDTO: EquipoHardwareDTO): Promise<EquipoHardware> {
        const { equipo_id, hardware_id } = equipoHardwareDTO;

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);
        const hardware: Hardware | null = await this._hardwareService.findHardwareById(hardware_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }
        if (!hardware) {
            throw new Error(`Hardware con id ${hardware_id} no encontrado`);
        }

        const newEquipoHardware = new EquipoHardware();
        newEquipoHardware.equipo_id = equipo;
        newEquipoHardware.hardware_id = hardware;

        const repository = await this.getRepository();

        try {
            return await repository.save(newEquipoHardware);
        } catch (error) {
            console.error('Error al crear el equipo hardware:', error);
            throw error;
        }
    }

    async updateEquipoHardware(id: number, equipoHardwareDTO: EquipoHardwareDTO): Promise<EquipoHardware | null> {
        const repository = await this.getRepository();
        const equipoHardwareToUpdate = await repository.findOneBy({ id });

        if (!equipoHardwareToUpdate) {
            throw new Error(`EquipoHardware con id ${id} no encontrado`);
        }

        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipoHardwareDTO.equipo_id);
        const hardware: Hardware | null = await this._hardwareService.findHardwareById(equipoHardwareDTO.hardware_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipoHardwareDTO.equipo_id} no encontrado`);
        }
        if (!hardware) {
            throw new Error(`Hardware con id ${equipoHardwareDTO.hardware_id} no encontrado`);
        }

        repository.merge(equipoHardwareToUpdate, {
            equipo_id: equipo,
            hardware_id: hardware
        });

        try {
            return await repository.save(equipoHardwareToUpdate);
        } catch (error) {
            console.error('Error al actualizar el equipo hardware:', error);
            throw error;
        }
    }

    async deleteEquipoHardware(id: number): Promise<void> {
        const repository = await this.getRepository();
        const equipoHardwareToDelete = await repository.findOneBy({ id });

        if (!equipoHardwareToDelete) {
            throw new Error(`EquipoHardware con id ${id} no encontrado`);
        }

        try {
            await repository.remove(equipoHardwareToDelete);
        } catch (error) {
            console.error('Error al eliminar el equipo hardware:', error);
            throw error;
        }
    }
}
