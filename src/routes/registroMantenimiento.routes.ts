import { Router, Request, Response } from 'express';
import { RegistroMantenimientoController} from '../controllers/index.controller';
import { BaseRouter } from '../config/routerConfiguration';
import { UsuarioMiddleware } from '../middlewares/usuario.middleware';

export class RegistroMantenimientoRouter extends BaseRouter<RegistroMantenimientoController,UsuarioMiddleware>{

    constructor() {
        super(RegistroMantenimientoController,UsuarioMiddleware);       
    }
    routes(): void {
        this.router.get(
            '/registroMantenimientos', 
            (req:Request, res:Response) => {
                this.controller.getRegistroMantenimientos(req, res);
            }
        );

        this.router.post(
            '/crear/registroMantenimiento',
            (req: Request, res: Response) => {
                this.controller.createRegistroMantenimiento(req, res);
            }
        );

        this.router.get(
            '/registroMantenimiento/:id', 
            (req: Request, res: Response) => this.controller.getRegistroMantenimientoById(req, res)
        );

        this.router.put(
            '/registroMantenimiento/:id',
            (req: Request, res: Response) => this.controller.updateRegistroMantenimiento(req, res)
        );
    
        this.router.delete(
            '/registroMantenimiento/:id',
            (req: Request, res: Response) => this.controller.deleteRegistroMantenimiento(req, res)
        );


    }

}

