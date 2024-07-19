import { BaseRouter } from '../config/routerConfiguration';
import { AuthController } from '../controllers/index.controller';
import { HelperMiddleware } from '../middlewares/helper.middleware';
export declare class AuthRouter extends BaseRouter<AuthController, HelperMiddleware> {
    constructor();
    routes(): void;
}
