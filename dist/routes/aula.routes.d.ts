import { BaseRouter } from '../config/routerConfiguration';
import { AulaController } from '../controllers/index.controller';
import { AulaMiddleware } from '../middlewares/aula.middleware';
export declare class AulaRouter extends BaseRouter<AulaController, AulaMiddleware> {
    constructor();
    routes(): void;
}
