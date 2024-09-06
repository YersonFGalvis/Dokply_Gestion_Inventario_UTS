import { Router, Request, Response } from 'express';
import { EquipoHardwareController } from '../controllers/equipoHardware.controller';
import { BaseRouter } from '../config/routerConfiguration';
import { EquipoHardwareMiddleware } from '../middlewares/equipoHardware.middleware';

export class EquipoHardwareRouter extends BaseRouter<EquipoHardwareController, EquipoHardwareMiddleware> {

    constructor() {
        super(EquipoHardwareController, EquipoHardwareMiddleware);
    }

    routes(): void {
        this.router.get(
            '/equiposHardware',
            this.middleware.passAuth('jwt'),
            (req: Request, res: Response) => {
                this.controller.getEquiposHardware(req, res);
            }
        );

        this.router.post(
            '/crear/equipoHardware',
            (req: Request, res: Response) => {
                this.middleware.equipoHardwareValidator(req, res, () => {
                    this.controller.createEquipoHardware(req, res);
                });
            }
        );

        this.router.get(
            '/equipoHardware/:id',
            (req: Request, res: Response) => this.controller.getEquipoHardwareById(req, res)
        );

        this.router.put(
            '/equipoHardware/:id',
            (req: Request, res: Response) => this.controller.updateEquipoHardware(req, res)
        );

        this.router.delete(
            '/equipoHardware/:id',
            (req: Request, res: Response) => this.controller.deleteEquipoHardware(req, res)
        );
    }
}
