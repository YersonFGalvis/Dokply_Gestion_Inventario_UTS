import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { AuthController, RolController, UsuarioController, RegistroMantenimientoController } from '../controllers/index.controller';
import { HelperMiddleware } from '../middlewares/helper.middleware';

const rolController = new RolController();
const usuarioController = new UsuarioController();
const registroMantenimientoController = new RegistroMantenimientoController();
export class AuthRouter extends BaseRouter<AuthController, HelperMiddleware> {
    constructor() {
        super(AuthController, HelperMiddleware);
    }

    routes(): void {

        this.router.get('/login', (req: Request, res: Response) => {
            res.render('auth/login', { error: req.query.error });
        });      

        this.router.get('/logout', 
            this.middleware.passAuth('jwt'),
            (req: Request, res: Response) => {
            const cookies = req.cookies;
        
            Object.keys(cookies).forEach(cookieName => {
                res.clearCookie(cookieName);
            });
        
            res.redirect('/login');
        });

        this.router.get('/registro', async (req: Request, res: Response) => {
            const roles = await rolController.getRols(req, res);
            res.render('auth/registro', { roles, datos: {}, error: req.query.error });
        });

        this.router.get('/settings', 
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response) => { 
            const userCookie = req.cookies['user']

            const userId = await usuarioController.getUserById(req, res, userCookie);

            res.render('admin/settings', { userId, datos: {}, error: req.query.error });
        });

        this.router.get('/dashboard',
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response) => {
            const estadisticas = await registroMantenimientoController.getRegistroMantenimientosInicio(req, res);
            res.render('admin/dashboard', { estadisticas, error: req.query.error });
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
