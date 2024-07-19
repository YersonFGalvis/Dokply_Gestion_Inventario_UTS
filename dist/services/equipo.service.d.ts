import { BaseService } from "../config/serviceConfiguration";
import { Equipo } from "../entity";
import { EquipoDTO } from "../dto/equipo.dto";
import { AulaService } from "./aula.service";
export declare class EquipoService extends BaseService<Equipo> {
    private readonly _aulaService;
    constructor(_aulaService?: AulaService);
    findEquipoById(id: number): Promise<Equipo | null>;
    createEquipo(equipoDTO: EquipoDTO): Promise<Equipo>;
    findAllEquipos(): Promise<Equipo[]>;
    updateEquipo(id: number, equipoDTO: EquipoDTO): Promise<Equipo | null>;
    deleteEquipo(id: number): Promise<void>;
}
