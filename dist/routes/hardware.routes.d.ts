import { BaseRouter } from '../config/routerConfiguration';
import { HardwareController } from '../controllers/index.controller';
import { HardwareMiddleware } from '../middlewares/hardware.middleware';
export declare class HardwareRouter extends BaseRouter<HardwareController, HardwareMiddleware> {
    constructor();
    routes(): void;
}
