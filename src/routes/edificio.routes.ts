import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { EdificioController } from '../controllers/index.controller';
import { EdificioMiddleware } from '../middlewares/edificio.middleware';

export class EdificioRouter extends BaseRouter<EdificioController, EdificioMiddleware> {

    constructor() {
        super(EdificioController, EdificioMiddleware);
    }

    routes(): void {
        this.router.get(
            '/edificios',
            async (req: Request, res: Response) => {
                const edificios = await this.controller.getEdificios(req, res);
                res.render('admin/edificios', { edificios, statusCode: edificios.status, datos: {}, error: req.query.error }); 
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
        );

        this.router.put(
            '/edificio/:id',
            (req: Request, res: Response) => this.controller.updateEdificio(req, res)
        );
    
        this.router.delete(
            '/edificio/:id',
            (req: Request, res: Response) => this.controller.deleteEdificio(req, res)
        );
    }
}
