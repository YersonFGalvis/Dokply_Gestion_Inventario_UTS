import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { RolController } from '../controllers/index.controller';
import { RolMiddleware } from '../middlewares/rol.middleware';

export class RolRouter extends BaseRouter<RolController,RolMiddleware>{

    constructor() {
        super(RolController,RolMiddleware);       
    }

    routes(): void {
        this.router.get(
            '/roles', 
            this.middleware.passAuth('jwt'),
            (req:Request, res:Response) => {
                this.controller.getRols(req, res)
                .then(roles => res.json(roles));

            }
        );

        this.router.post(
            '/crear/rol',
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.rolValidator(req, res, next);
            },
            (req: Request, res: Response, next: NextFunction) => {
                this.middleware.rolDuplicateValidator(req, res, next);
            },
            (req: Request, res: Response) => {
                this.controller.createRol(req, res)
                .then(roles => res.json(roles));
            }
        );

        this.router.get(
            '/rol/:id', 
            (req:Request, res:Response) => {
                this.controller.getRolById(req, res)
                .then(roles => res.json(roles));
            }
        );

        this.router.put(
            '/rol/:id',
            (req: Request, res: Response) => {
                this.controller.updateRol(req, res)
                .then(roles => res.json(roles));
            }
        );
    
        this.router.delete(
            '/rol/:id',
            (req: Request, res: Response) => {
                this.controller.deleteRol(req, res)
                .then(roles => res.json(roles));
            }
        );
    }
}

