import { BaseRouter } from '../config/routerConfiguration';
import { EquipoController } from '../controllers/index.controller';
import { EquipoMiddleware } from '../middlewares/equipo.middleware';
export declare class EquipoRouter extends BaseRouter<EquipoController, EquipoMiddleware> {
    constructor();
    routes(): void;
}
