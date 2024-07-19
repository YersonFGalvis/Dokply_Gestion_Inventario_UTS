import { Equipo } from './Equipo';
import { Usuario } from './Usuario';
import { TipoMantenimiento } from './TipoMantenimiento';
export declare class RegistroMantenimiento {
    id: number;
    equipo_id: Equipo;
    tipo_mantenimiento_id: TipoMantenimiento;
    fecha: Date;
    detalle: string;
    usuario_id: Usuario;
}
