import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { CargoController, AreaController } from '../controllers/index.controller';
import { CargoMiddleware } from '../middlewares/cargo.middleware';

const areaController = new AreaController();

export class CargoRouter extends BaseRouter<CargoController, CargoMiddleware> {

    constructor() {
        super(CargoController, CargoMiddleware);
    }

    routes(): void {
        this.router.get(
            '/cargos',
            async (req: Request, res: Response) => {
                const cargos = await this.controller.getCargos(req, res);
                const areas = await areaController.getAreas(req, res);

                res.render('admin/cargos', { cargos, statusCode: cargos.status, areas, datos: {}, error: req.query.error });
            }
        );

        this.router.post(
            '/crear/cargo',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.cargoValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.cargoDuplicateValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createCargo(req, res);
                res.redirect('/cargos')
            }
        );

        this.router.get(
            '/cargo/:id',
            (req: Request, res: Response) => this.controller.getCargoById(req, res)
        );

        this.router.put(
            '/cargo/:id',
            (req: Request, res: Response) => this.controller.updateCargo(req, res)
        );
    
        this.router.delete(
            '/cargo/:id',
            (req: Request, res: Response) => this.controller.deleteCargo(req, res)
        );
        
    }
}
