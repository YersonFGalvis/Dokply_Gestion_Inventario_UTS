import { BaseRouter } from '../config/routerConfiguration';
import { AlertaController } from '../controllers/index.controller';
import { AlertaMiddleware } from '../middlewares/alerta.middleware';
export declare class AlertaRouter extends BaseRouter<AlertaController, AlertaMiddleware> {
    constructor();
    routes(): void;
}
