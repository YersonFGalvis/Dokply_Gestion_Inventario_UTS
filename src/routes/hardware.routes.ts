import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { HardwareController } from '../controllers/index.controller';
import { HardwareMiddleware } from '../middlewares/hardware.middleware';

export class HardwareRouter extends BaseRouter<HardwareController, HardwareMiddleware> {

    constructor() {
        super(HardwareController, HardwareMiddleware);
    }

    routes(): void {
        this.router.get(
            '/hardware',
            async (req: Request, res: Response) => {
                const hardware = this.controller.getHardware(req, res);
                
                res.render('admin/hardware', { hardware, datos: {}, error: req.query.error }); 
            }
        );

        this.router.post(
            '/crear/hardware',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.hardwareValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.hardwareDuplicateValidator(req, res, next);
            },
            (req: Request, res: Response) => {
                this.controller.createHardware(req, res);
            }
        );

        this.router.get(
            '/hardware/:id',
            (req: Request, res: Response) => this.controller.getHardwareById(req, res)
        );

        this.router.put(
            '/edificio/:id',
            (req: Request, res: Response) => this.controller.updateHardware(req, res)
        );

        this.router.delete(
            '/edificio/:id',
            (req: Request, res: Response) => this.controller.deleteHardware(req, res)
        );
    }
}
