import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { TipoMantenimientoController } from '../controllers/index.controller';
import { TipoMantenimientoMiddleware } from '../middlewares/tipoMantenimiento.middleware';

export class TipoMantenimientoRouter extends BaseRouter<TipoMantenimientoController, TipoMantenimientoMiddleware> {

    constructor() {
        super(TipoMantenimientoController, TipoMantenimientoMiddleware);       
    }

    routes(): void {
        this.router.get(
            '/tipoMantenimientos', 
            (req: Request, res: Response) => this.controller.getTipoMantenimientos(req, res)
        );

        this.router.post(
            '/crear/tipoMantenimiento',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.tipoMantenimientoValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.tipoMantenimientoDuplicateValidator(req, res, next);
            },
            (req: Request, res: Response) => {
                this.controller.createTipoMantenimiento(req, res);
            }
        );

        this.router.get(
            '/tipoMantenimiento/:id', 
            (req: Request, res: Response) => this.controller.getTipoMantenimientoById(req, res)
        );

        this.router.put(
            '/tipoMantenimiento/:id',
            (req: Request, res: Response) => this.controller.updateTipoMantenimiento(req, res)
        );
    
        this.router.delete(
            '/tipoMantenimiento/:id',
            (req: Request, res: Response) => this.controller.deleteTipoMantenimiento(req, res)
        );
    }
}
