import { BaseRouter } from '../config/routerConfiguration';
import { TipoMantenimientoController } from '../controllers/index.controller';
import { TipoMantenimientoMiddleware } from '../middlewares/tipoMantenimiento.middleware';
export declare class TipoMantenimientoRouter extends BaseRouter<TipoMantenimientoController, TipoMantenimientoMiddleware> {
    constructor();
    routes(): void;
}
