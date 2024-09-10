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
                this.controller.getEquiposHardware(req, res)
                    .then(equiposHardware => res.json(equiposHardware))
            }
        );

        this.router.post(
            '/crear/equipoHardware',
            (req: Request, res: Response) => {
                this.middleware.equipoHardwareValidator(req, res, () => {
                    this.controller.createEquipoHardware(req, res)
                        .then(equipoHardware => res.json(equipoHardware))
                });
            }
        );

        this.router.get(
            '/equipoHardware/:id',
            (req: Request, res: Response) => {
                this.controller.getEquipoHardwareById(req, res)
                    .then(equipoHardware => res.json(equipoHardware));
            }
        );
        

        this.router.put(
            '/equipoHardware/:id',
            (req: Request, res: Response) => {
                this.controller.updateEquipoHardware(req, res)
                    .then(updatedEquipoHardware => res.json(updatedEquipoHardware));
            }
        );
        

        this.router.delete(
            '/equipoHardware/:id',
            (req: Request, res: Response) => {
                this.controller.deleteEquipoHardware(req, res)
                .then(equipoHardware => res.json(equipoHardware))
            }
        );
        
    }
}
