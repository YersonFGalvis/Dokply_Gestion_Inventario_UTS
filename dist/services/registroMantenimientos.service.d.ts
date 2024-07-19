import { BaseService } from "../config/serviceConfiguration";
import { RegistroMantenimiento } from "../entity";
import { RegistroMantenimientoDTO } from "../dto/registroMantenimiento.dto";
import { EquipoService } from "./equipo.service";
import { TipoMantenimientoService } from "./tipoMantenimiento.service";
import { UsuarioService } from './usuario.service';
export declare class RegistroMantenimientoService extends BaseService<RegistroMantenimiento> {
    private readonly _equipoService;
    private readonly _tipoMantenimientoService;
    private readonly _usuarioService;
    constructor(_equipoService?: EquipoService, _tipoMantenimientoService?: TipoMantenimientoService, _usuarioService?: UsuarioService);
    findAllRegistroMantenimiento(): Promise<RegistroMantenimiento[]>;
    findRegistroMantenimientoById(id: number): Promise<RegistroMantenimiento | null>;
    createRegistroMantenimiento(registroMantenimientoDTO: RegistroMantenimientoDTO): Promise<RegistroMantenimiento>;
    updateRegistroMantenimiento(id: number, registroMantenimientoDTO: RegistroMantenimientoDTO): Promise<RegistroMantenimiento | null>;
    deleteRegistroMantenimiento(id: number): Promise<void>;
}
