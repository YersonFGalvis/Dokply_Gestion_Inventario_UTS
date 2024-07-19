import { BaseRouter } from '../config/routerConfiguration';
import { RegistroEquipoController } from '../controllers/index.controller';
import { RegistroEquipoMiddleware } from '../middlewares/registroEquipo.middleware';
export declare class RegistroEquipoRouter extends BaseRouter<RegistroEquipoController, RegistroEquipoMiddleware> {
    constructor();
    routes(): void;
}
