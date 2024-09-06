import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { RegistroEquipoController } from '../controllers/index.controller';
import { RegistroEquipoMiddleware } from '../middlewares/registroEquipo.middleware';

export class RegistroEquipoRouter extends BaseRouter<RegistroEquipoController, RegistroEquipoMiddleware> {

    constructor() {
        super(RegistroEquipoController, RegistroEquipoMiddleware);
    }

    routes(): void {
        this.router.get(
            '/registroEquipos',
            (req: Request, res: Response) => this.controller.getRegistroEquipos(req, res)
        );

        this.router.post(
            '/crear/registroEquipo',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.registroEquipoValidator(req, res, next);
            },
            (req: Request, res: Response) => {
                this.controller.createRegistroEquipo(req, res)
                    .then(registroEquipo => res.json(registroEquipo))
            }
        );

        this.router.get(
            '/registroEquipo/:id',
            (req: Request, res: Response) => this.controller.getRegistroEquipoById(req, res)
        );

        this.router.put(
            '/registroEquipo/:id',
            (req: Request, res: Response) => this.controller.updateRegistroEquipo(req, res)
        );

        this.router.delete(
            '/registroEquipo/:id',
            (req: Request, res: Response) => this.controller.deleteRegistroEquipo(req, res)
        );
    }
}
