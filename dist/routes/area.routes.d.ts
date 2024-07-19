import { BaseRouter } from '../config/routerConfiguration';
import { AreaController } from '../controllers/index.controller';
import { AreaMiddleware } from '../middlewares/area.middleware';
export declare class AreaRouter extends BaseRouter<AreaController, AreaMiddleware> {
    constructor();
    routes(): void;
}
