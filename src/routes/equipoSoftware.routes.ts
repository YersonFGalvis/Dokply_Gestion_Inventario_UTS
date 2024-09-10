import { Router, Request, Response } from 'express';
import { EquipoSoftwareController } from '../controllers/equipoSoftware.controller';
import { BaseRouter } from '../config/routerConfiguration';
import { EquipoSoftwareMiddleware } from '../middlewares/equipoSoftware.middleware';

export class EquipoSoftwareRouter extends BaseRouter<EquipoSoftwareController, EquipoSoftwareMiddleware> {

    constructor() {
        super(EquipoSoftwareController, EquipoSoftwareMiddleware);
    }

    routes(): void {
        this.router.get(
            '/equiposSoftware',
            this.middleware.passAuth('jwt'),
            (req: Request, res: Response) => {
                this.controller.getEquiposSoftware(req, res)
                    .then(equiposSoftware => res.json(equiposSoftware));
            }
        );
        

        this.router.post(
            '/crear/equipoSoftware',
            (req: Request, res: Response) => {
                this.middleware.equipoSoftwareValidator(req, res, () => {
                    this.controller.createEquipoSoftware(req, res)
                        .then(equipoSotfware => res.json(equipoSotfware))
                });
            }
        );

        this.router.get(
            '/equipoSoftware/:id',
            (req: Request, res: Response) => {
                this.controller.getEquipoSoftwareById(req, res)
                    .then(equipoSoftware => res.json(equipoSoftware));
            }
        );
        

        this.router.put(
            '/equipoSoftware/:id',
            (req: Request, res: Response) => {
                this.controller.updateEquipoSoftware(req, res)
                    .then(updatedEquipoSoftware => res.json(updatedEquipoSoftware));
            }
        );
        

        this.router.delete(
            '/equipoSoftware/:id',
            (req: Request, res: Response) => {
                this.controller.deleteEquipoSoftware(req, res)
                .then(equipoSoftware => res.json(equipoSoftware))
            }
        );
    }
}
