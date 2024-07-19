import { Repository } from "typeorm";
import { BaseService } from "../config/serviceConfiguration";
import { Hardware, Equipo } from "../entity";
import { HardwareDTO } from "../dto/hardware.dto";
import { EquipoService } from "./equipo.service";

export class HardwareService extends BaseService<Hardware> {
    constructor(private readonly _equipoService: EquipoService = new EquipoService()) {
        super(Hardware);
    }

    async findHardwareById(id: number): Promise<Hardware | null> {
        const repository = await this.getRepository();
        return repository.findOneBy({ id });
    }

    async createHardware(hardwareDTO: HardwareDTO): Promise<Hardware> {
        const { nombre, descripcion, estado, equipo_id } = hardwareDTO;
        
        const equipo: Equipo | null = await this._equipoService.findEquipoById(equipo_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${equipo_id} no encontrado`);
        }

        const newHardware = new Hardware();
        newHardware.nombre = nombre;
        newHardware.descripcion = descripcion ?? '';
        newHardware.estado = estado;
        newHardware.equipo_id = equipo;

        try {
            const repository = await this.getRepository();
            return await repository.save(newHardware);
        } catch (error) {
            console.error('Error al crear el hardware:', error);
            throw error;
        } 
    }

    async findHardwareByNombre(nombre: string): Promise<Hardware | null> {
        const repository = await this.getRepository();
        return repository.findOne({ where: { nombre } });
    }

    async findAllHardwares(): Promise<Hardware[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async updateHardware(id: number, hardwareDTO: HardwareDTO): Promise<Hardware | null> {
        const repository = await this.getRepository();
        const hardwareToUpdate = await repository.findOneBy({ id });

        if (!hardwareToUpdate) {
            throw new Error(`Hardware con id ${id} no encontrado`);
        }

        const equipo: Equipo | null = await this._equipoService.findEquipoById(hardwareDTO.equipo_id);

        if (!equipo) {
            throw new Error(`Equipo con id ${hardwareDTO.equipo_id} no encontrado`);
        }

        repository.merge(hardwareToUpdate, {
            nombre: hardwareDTO.nombre,
            descripcion: hardwareDTO.descripcion ?? '',
            estado: hardwareDTO.estado,
            equipo_id: equipo
        });

        try {
            return await repository.save(hardwareToUpdate);
        } catch (error) {
            console.error('Error al actualizar el hardware:', error);
            throw error;
        }
    }

    async deleteHardware(id: number): Promise<void> {
        const repository = await this.getRepository();
        const hardwareToDelete = await repository.findOneBy({ id });

        if (!hardwareToDelete) {
            throw new Error(`Hardware con id ${id} no encontrado`);
        }

        try {
            await repository.remove(hardwareToDelete);
        } catch (error) {
            console.error('Error al eliminar el hardware:', error);
            throw error;
        }
    }
}
