import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { AreaController } from '../controllers/index.controller';
import { AreaMiddleware } from '../middlewares/area.middleware';


export class AreaRouter extends BaseRouter<AreaController, AreaMiddleware> {

    constructor() {
        super(AreaController, AreaMiddleware);
    }

    routes(): void {

        this.router.get('/areas', async (req: Request, res: Response) => {
            try {
                const areas = await this.controller.getAreas(req, res);
                if (req.query.format === 'json') {
                    // Devuelve solo JSON si el parámetro de consulta 'format' es 'json'
                    res.json(areas);
                } else {
                    // Renderiza la vista con datos iniciales
                    res.render('admin/areas', {
                        areas,
                        statusCode: areas.status,
                        error: req.query.error
                    });
                }
            } catch (error) {
                res.status(500).json({ error: 'Error retrieving areas' });
            }
        });


        this.router.post(
            '/crear/area',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.areaValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.areaDuplicateValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createArea(req, res);
                res.redirect('/areas');
            }
        );

        this.router.get(
            '/area/:id',
            (req: Request, res: Response) => this.controller.getAreaById(req, res)
                .then(area => res.json(area))
        );

        this.router.put(
            '/area/:id',
            (req: Request, res: Response) => this.controller.updateArea(req, res)
                .then(area => res.json(area))
        );

        this.router.delete(
            '/area/:id',
            (req: Request, res: Response) =>  this.controller.deleteArea(req, res)
                .then(area => res.json(area))
        );
    }
}
