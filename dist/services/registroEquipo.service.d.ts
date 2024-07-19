import { BaseService } from "../config/serviceConfiguration";
import { RegistroEquipo } from "../entity";
import { EquipoService } from "./equipo.service";
import { ResponsableService } from "./responsable.service";
import { RegistroEquipoDTO } from "../dto/registroEquipo.dto";
export declare class RegistroEquipoService extends BaseService<RegistroEquipo> {
    private readonly _equipoService;
    private readonly _responsableService;
    constructor(_equipoService?: EquipoService, _responsableService?: ResponsableService);
    findRegistroEquipoById(id: number): Promise<RegistroEquipo | null>;
    createRegistroEquipo(registroEquipoDTO: RegistroEquipoDTO): Promise<RegistroEquipo>;
    findAllRegistroEquipos(): Promise<RegistroEquipo[]>;
    updateRegistroEquipo(id: number, registroEquipoDTO: RegistroEquipoDTO): Promise<RegistroEquipo | null>;
    deleteRegistroEquipo(id: number): Promise<void>;
}
