import { BaseRouter } from '../config/routerConfiguration';
import { RolController } from '../controllers/index.controller';
import { RolMiddleware } from '../middlewares/rol.middleware';
export declare class RolRouter extends BaseRouter<RolController, RolMiddleware> {
    constructor();
    routes(): void;
}
