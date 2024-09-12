import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { ResponsableController, CargoController } from '../controllers/index.controller';
import { ResponsableMiddleware } from '../middlewares/responsable.middleware';

const cargoController = new CargoController();

export class ResponsableRouter extends BaseRouter<ResponsableController, ResponsableMiddleware> {

    constructor() {
        super(ResponsableController, ResponsableMiddleware);
    }

    routes(): void {
        this.router.get(
            '/responsables',
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response) => {
                const responsables = await this.controller.getResponsables(req, res);
                const cargos = await cargoController.getCargos(req, res);
                if (req.query.format === 'json') {
                    res.json(responsables);
                } else {
                    res.render('admin/responsables', { responsables, statusCode: responsables.status, cargos, datos: {}, error: req.query.error });
                }
            }
        );

        this.router.post(
            '/crear/responsable',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.responsableValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createResponsable(req, res);
                res.redirect('/responsables')
            }
        );

        this.router.get(
            '/responsable/:id',
            (req: Request, res: Response) => this.controller.getResponsableById(req, res)
                .then(responsables => res.json(responsables))
        );

        this.router.put(
            '/responsable/:id',
            (req: Request, res: Response) => this.controller.updateResponsable(req, res)
                .then(responsables => res.json(responsables))
        );

        this.router.delete(
            '/responsable/:id',
            (req: Request, res: Response) => this.controller.deleteResponsable(req, res)
                .then(responsables => res.json(responsables))
        );


    }
}
