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
                const hardware = await this.controller.getHardware(req, res);
                if (req.query.format === 'json') {
                    // Devuelve solo JSON si el parámetro de consulta 'format' es 'json'
                    res.json(hardware);
                } else {
                    res.render('admin/hardware', { hardware, datos: {}, error: req.query.error });
                }
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
            async (req: Request, res: Response) => {
                await this.controller.createHardware(req, res)
                res.redirect('/hardware')
            }
        );

        this.router.get(
            '/hardware/:id',
            (req: Request, res: Response) => this.controller.getHardwareById(req, res)
                .then(hardware => res.json(hardware))
        );

        this.router.put(
            '/hardware/:id',
            (req: Request, res: Response) => this.controller.updateHardware(req, res)
                .then(hardware => res.json(hardware))
        );

        this.router.delete(
            '/hardware/:id',
            (req: Request, res: Response) => this.controller.deleteHardware(req, res)
                .then(hardware => res.json(hardware))
        );
    }
}
