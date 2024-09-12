import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { EdificioController, AulaController } from '../controllers/index.controller';
import { EdificioMiddleware } from '../middlewares/edificio.middleware';

const aulaController = new AulaController();
export class EdificioRouter extends BaseRouter<EdificioController, EdificioMiddleware> {

    constructor() {
        super(EdificioController, EdificioMiddleware);
    }

    routes(): void {
        this.router.get(
            '/edificios',
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response) => {
                const edificios = await this.controller.getEdificios(req, res);
                if (req.query.format === 'json') {
                    res.json({ edificios });
                } else {
                    res.render('admin/edificios', { edificios, statusCode: edificios.status, datos: {}, error: req.query.error });
                }
            }
        );

        this.router.post(
            '/crear/edificio',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.edificioValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.edificioDuplicateValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createEdificio(req, res);
                res.redirect('/edificios');
            }
        );

        this.router.get(
            '/edificio/:id',
            (req: Request, res: Response) => this.controller.getEdificioById(req, res)
                .then(edificios => res.json(edificios))
        );

        this.router.get(
            '/edificio/:id/aulas',
            async (req: Request, res: Response) => {
                const { id } = req.params;
                const aulas = await aulaController.getAulasByEdificio(req, res);
                res.json(aulas);
            }
        );

        this.router.put(
            '/edificio/:id',
            (req: Request, res: Response) => this.controller.updateEdificio(req, res)
                .then(edificios => res.json(edificios))
        );

        this.router.delete(
            '/edificio/:id',
            (req: Request, res: Response) => this.controller.deleteEdificio(req, res)
                .then(edificios => res.json(edificios))
        );
    }
}
