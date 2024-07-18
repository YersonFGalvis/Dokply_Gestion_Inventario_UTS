import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { AlertaController } from '../controllers/index.controller';
import { AlertaMiddleware } from '../middlewares/alerta.middleware';

export class AlertaRouter extends BaseRouter<AlertaController, AlertaMiddleware> {

    constructor() {
        super(AlertaController, AlertaMiddleware);       
    }

    routes(): void {
        this.router.get(
            '/alertas', 
            (req: Request, res: Response) => this.controller.getAlertas(req, res)
        );

        this.router.post(
            '/crear/alerta',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.alertaValidator(req, res, next);
            },
            (req: Request, res: Response) => {
                this.controller.createAlerta(req, res);
            }
        );

        this.router.get(
            '/alerta/:id', 
            (req: Request, res: Response) => this.controller.getAlertaById(req, res)
        );

        this.router.put(
            '/tipo-mantenimiento/:id',
            (req: Request, res: Response) => this.controller.updateAlerta(req, res)
        );
    
        this.router.delete(
            '/tipo-mantenimiento/:id',
            (req: Request, res: Response) => this.controller.deleteAlerta(req, res)
        );
    }
}
