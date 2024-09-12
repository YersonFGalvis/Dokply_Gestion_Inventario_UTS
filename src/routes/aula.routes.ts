import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { AulaController, EdificioController, EquipoController } from '../controllers/index.controller';
import { AulaMiddleware } from '../middlewares/aula.middleware';

const edificioController = new EdificioController();
const equipoController = new EquipoController();

export class AulaRouter extends BaseRouter<AulaController, AulaMiddleware> {

    constructor() {
        super(AulaController, AulaMiddleware);
    }

    routes(): void {
        this.router.get(
            '/aulas',
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response) => {
                const aulas = await this.controller.getAulas(req, res);
                const edificios = await edificioController.getEdificios(req, res);
                if (req.query.format === 'json') {
                    res.json({ aulas, edificios });
                } else {
                    res.render('admin/aulas', { aulas, statusCode: aulas.status, edificios, datos: {}, error: req.query.error });
                }
            }
        );

        this.router.post(
            '/crear/aula',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.aulaValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.aulaDuplicateValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createAula(req, res);
                res.redirect('/aulas');
            }
        );

        this.router.get(
            '/aula/:id',
            (req: Request, res: Response) => this.controller.getAulaById(req, res)
                .then(aulas => res.json(aulas))
        );

        this.router.get(
            '/aula/:id/equipos',
            async (req: Request, res: Response) => {
                const { id } = req.params;
                const equipos = await equipoController.getEquiposByAula(req, res);
                res.json(equipos);
            }
        );

        this.router.put(
            '/aula/:id',
            (req: Request, res: Response) => this.controller.updateAula(req, res)
                .then(aulas => res.json(aulas))
        );

        this.router.delete(
            '/aula/:id',
            (req: Request, res: Response) => this.controller.deleteAula(req, res)
                .then(aulas => res.json(aulas))
        );
    }
}
