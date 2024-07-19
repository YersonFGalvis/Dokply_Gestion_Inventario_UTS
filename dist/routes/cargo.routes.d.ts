import { BaseRouter } from '../config/routerConfiguration';
import { CargoController } from '../controllers/index.controller';
import { CargoMiddleware } from '../middlewares/cargo.middleware';
export declare class CargoRouter extends BaseRouter<CargoController, CargoMiddleware> {
    constructor();
    routes(): void;
}
