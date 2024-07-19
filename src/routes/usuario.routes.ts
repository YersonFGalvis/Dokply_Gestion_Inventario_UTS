import { Router, Request, Response, NextFunction } from 'express';
import { UsuarioController, RolController } from '../controllers/index.controller';
import { BaseRouter } from '../config/routerConfiguration';
import { UsuarioMiddleware } from '../middlewares/usuario.middleware';

const rolController = new RolController();

export class UsuarioRouter extends BaseRouter<UsuarioController, UsuarioMiddleware> {

    constructor() {
        super(UsuarioController, UsuarioMiddleware);
    }

    routes(): void {
        this.router.get(
            '/usuarios',
            // this.middleware.passAuth("jwt"),
            // (req: Request, res: Response, next: NextFunction) => {
            //     this.middleware.checkAdminRole(req, res, next);
            // },
            async (req: Request, res: Response) => {
                const users = await this.controller.getUsers(req, res);
                const roles = await rolController.getRols(req, res);

                res.render('admin/user', {users, roles, datos: {}, error: req.query.error});
            }
        );

        this.router.post(
            '/crear/usuario',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.usuarioValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.usuarioEmailDuplicateValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createUser(req, res);
                res.redirect('/usuarios')
            }
        );

        this.router.get(
            "/usuarios/usuario-rol/:id",
            (req, res) => this.controller.getUserWithRolById(req, res)
        );

        this.router.put(
            '/usuarios/:id',
            (req: Request, res: Response) => this.controller.updateUser(req, res)
        );
    
        this.router.delete(
            '/usuarios/:id',
            (req: Request, res: Response) => this.controller.deleteUser(req, res)
        );

    }
}

