import { RegistroMantenimientoController } from '../controllers/index.controller';
import { BaseRouter } from '../config/routerConfiguration';
import { UsuarioMiddleware } from '../middlewares/usuario.middleware';
export declare class RegistroMantenimientoRouter extends BaseRouter<RegistroMantenimientoController, UsuarioMiddleware> {
    constructor();
    routes(): void;
}
