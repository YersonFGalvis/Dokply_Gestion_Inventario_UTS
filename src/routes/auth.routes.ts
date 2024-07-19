import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { AuthController, RolController } from '../controllers/index.controller';
import { HelperMiddleware } from '../middlewares/helper.middleware';

const rolController = new RolController();
export class AuthRouter extends BaseRouter<AuthController, HelperMiddleware> {
    constructor() {
        super(AuthController, HelperMiddleware);
    }

    routes(): void {

        this.router.get('/login', (req: Request, res: Response) => {
            res.render('auth/login', { error: req.query.error }); 
        });

        this.router.get('/registro', async (req: Request, res: Response) => {
            const roles = await rolController.getRols(req, res);
            res.render('auth/registro', { roles, datos: {}, error: req.query.error });
        });

        this.router.get('/settings', async (req: Request, res: Response) => {
            const roles = await rolController.getRols(req, res);
            res.render('admin/settings', { roles, datos: {}, error: req.query.error }); 
        });

        this.router.get('/dashboard', (req: Request, res: Response) => {
            res.render('admin/dashboard', { error: req.query.error }); 
        });
        
        this.router.post(
            '/login',
            this.middleware.passAuth("login"),
            (req: Request, res: Response) => {
              this.controller.login(req, res);
            }
        );

    }
}
