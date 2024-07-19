import { UsuarioController } from '../controllers/index.controller';
import { BaseRouter } from '../config/routerConfiguration';
import { UsuarioMiddleware } from '../middlewares/usuario.middleware';
export declare class UsuarioRouter extends BaseRouter<UsuarioController, UsuarioMiddleware> {
    constructor();
    routes(): void;
}
