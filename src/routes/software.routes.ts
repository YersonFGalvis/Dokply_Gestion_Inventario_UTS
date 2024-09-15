import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { SoftwareController } from '../controllers/index.controller';
import { SoftwareMiddleware } from '../middlewares/software.middleware';

export class SoftwareRouter extends BaseRouter<SoftwareController, SoftwareMiddleware> {

    constructor() {
        super(SoftwareController, SoftwareMiddleware);
    }

    routes(): void {
        this.router.get(
            '/software',
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response) => {
                const software = await this.controller.getSoftware(req, res);

                if (req.query.format === 'json') {
                    res.json(software);
                } else {
                    res.render('admin/software', { software, datos: {}, error: req.query.error });
                }
            }
        );

        this.router.post(
            '/crear/software',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.softwareValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                await this.controller.createSoftware(req, res);
                res.redirect('/software')
            }
        );

        this.router.get(
            '/software/:id',
            (req: Request, res: Response) => this.controller.getSoftwareById(req, res)
                .then(software => res.json(software))
        );

        this.router.put(
            '/software/:id',
            (req: Request, res: Response) => this.controller.updateSoftware(req, res)
                .then(software => res.json(software))
        );

        this.router.delete(
            '/software/:id',
            (req: Request, res: Response) => this.controller.deleteSoftware(req, res)
                .then(software => res.json(software))
        );
    }
}
