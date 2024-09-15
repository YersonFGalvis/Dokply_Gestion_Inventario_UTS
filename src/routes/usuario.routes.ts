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
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response, next: NextFunction) => {
                await this.middleware.checkCoordinadorRole(req, res, next);
            },
            async (req: Request, res: Response) => {
                const users = await this.controller.getUsers(req, res);
                const roles = await rolController.getRols(req, res);
                if (req.query.format === 'json') {
                    res.json({ users, roles });
                } else {
                    res.render('admin/user', { users, roles, datos: {}, error: req.query.error });
                }
            }
        );

        this.router.post(
            '/crear/usuario',
            async (req: Request, res: Response, next: NextFunction) => {
                await this.middleware.usuarioValidator(req, res, next);
            },
            async (req: Request, res: Response, next: NextFunction) => {
                await this.middleware.usuarioEmailDuplicateValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createUser(req, res);
                res.redirect('/usuarios')
            }
        );

        this.router.get(
            "/usuario/usuario-rol/:id",
            (req, res) => this.controller.getUserWithRolById(req, res)
                .then(users => res.json(users))
        );

        this.router.get(
            "/usuario/:id",
            (req, res) => this.controller.getUserById(req, res)
                .then(users => res.json(users))
        );

        this.router.put(
            '/usuario/:id',
            (req: Request, res: Response) => this.controller.updateUser(req, res)
                .then(users => res.json(users))
        );

        this.router.delete(
            '/usuario/:id',
            (req: Request, res: Response) => this.controller.deleteUser(req, res)
                .then(users => res.json(users))
        );

        this.router.put(
            '/usuario/activo/:id',
            (req: Request, res: Response) => this.controller.updateUserEstado(req, res)
                .then(users => res.json(users))
        );

    }
}

