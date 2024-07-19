import { BaseService } from "../config/serviceConfiguration";
import { Hardware } from "../entity";
import { HardwareDTO } from "../dto/hardware.dto";
import { EquipoService } from "./equipo.service";
export declare class HardwareService extends BaseService<Hardware> {
    private readonly _equipoService;
    constructor(_equipoService?: EquipoService);
    findHardwareById(id: number): Promise<Hardware | null>;
    createHardware(hardwareDTO: HardwareDTO): Promise<Hardware>;
    findHardwareByNombre(nombre: string): Promise<Hardware | null>;
    findAllHardwares(): Promise<Hardware[]>;
    updateHardware(id: number, hardwareDTO: HardwareDTO): Promise<Hardware | null>;
    deleteHardware(id: number): Promise<void>;
}
