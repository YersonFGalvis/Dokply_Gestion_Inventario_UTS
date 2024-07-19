import { BaseRouter } from '../config/routerConfiguration';
import { ResponsableController } from '../controllers/index.controller';
import { ResponsableMiddleware } from '../middlewares/responsable.middleware';
export declare class ResponsableRouter extends BaseRouter<ResponsableController, ResponsableMiddleware> {
    constructor();
    routes(): void;
}
