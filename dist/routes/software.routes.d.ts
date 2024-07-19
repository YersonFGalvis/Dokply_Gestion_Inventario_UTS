import { BaseRouter } from '../config/routerConfiguration';
import { SoftwareController } from '../controllers/index.controller';
import { SoftwareMiddleware } from '../middlewares/software.middleware';
export declare class SoftwareRouter extends BaseRouter<SoftwareController, SoftwareMiddleware> {
    constructor();
    routes(): void;
}
