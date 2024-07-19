import { BaseRouter } from '../config/routerConfiguration';
import { EdificioController } from '../controllers/index.controller';
import { EdificioMiddleware } from '../middlewares/edificio.middleware';
export declare class EdificioRouter extends BaseRouter<EdificioController, EdificioMiddleware> {
    constructor();
    routes(): void;
}
