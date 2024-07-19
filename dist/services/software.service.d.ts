import { BaseService } from "../config/serviceConfiguration";
import { Software } from "../entity";
import { SoftwareDTO } from "../dto/software.dto";
import { EquipoService } from "./equipo.service";
export declare class SoftwareService extends BaseService<Software> {
    private readonly _equipoService;
    constructor(_equipoService?: EquipoService);
    findSoftwareById(id: number): Promise<Software | null>;
    createSoftware(softwareDTO: SoftwareDTO): Promise<Software>;
    findSoftwareByNombre(nombre: string): Promise<Software | null>;
    findAllSoftwares(): Promise<Software[]>;
    updateSoftware(id: number, softwareDTO: SoftwareDTO): Promise<Software | null>;
    deleteSoftware(id: number): Promise<void>;
}
