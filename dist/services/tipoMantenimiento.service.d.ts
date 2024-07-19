import { BaseService } from "../config/serviceConfiguration";
import { TipoMantenimiento } from "../entity";
import { TipoMantenimientoDTO } from "../dto/tipoMantenimiento.dto";
export declare class TipoMantenimientoService extends BaseService<TipoMantenimiento> {
    constructor();
    findTipoMantenimientoById(id: number): Promise<TipoMantenimiento | null>;
    createTipoMantenimiento(body: TipoMantenimientoDTO): Promise<TipoMantenimiento>;
    findTipoMantenimientoByNombre(nombre: string): Promise<TipoMantenimiento | null>;
    findAllTipoMantenimientos(): Promise<TipoMantenimiento[]>;
    updateTipoMantenimiento(id: number, tipoMantenimientoDTO: TipoMantenimientoDTO): Promise<TipoMantenimiento | null>;
    deleteTipoMantenimiento(id: number): Promise<void>;
}
