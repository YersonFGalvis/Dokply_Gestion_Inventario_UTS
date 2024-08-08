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
            async (req: Request, res: Response) => {
                const software = this.controller.getSoftware(req, res);
                
                res.render('admin/software', { software, datos: {}, error: req.query.error }); 
            }
        );

        this.router.post(
            '/crear/software',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.softwareValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.softwareDuplicateValidator(req, res, next);
            },
            (req: Request, res: Response) => {
                this.controller.createSoftware(req, res);
            }
        );

        this.router.get(
            '/software/:id', 
            (req: Request, res: Response) => this.controller.getSoftwareById(req, res)
        );

        this.router.put(
            '/software/:id',
            (req: Request, res: Response) => this.controller.updateSoftware(req, res)
        );
    
        this.router.delete(
            '/software/:id',
            (req: Request, res: Response) => this.controller.deleteSoftware(req, res)
        );
    }
}
