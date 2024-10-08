import { Router, Request, Response } from 'express';
import { RegistroMantenimientoController, EdificioController, AulaController, EquipoController, TipoMantenimientoController} from '../controllers/index.controller';
import { BaseRouter } from '../config/routerConfiguration';
import { UsuarioMiddleware } from '../middlewares/usuario.middleware';

const edificioController = new EdificioController();
const aulaController = new AulaController();
const equipoController = new EquipoController();
const tipomantenimientoController = new TipoMantenimientoController();

export class RegistroMantenimientoRouter extends BaseRouter<RegistroMantenimientoController,UsuarioMiddleware>{

    constructor() {
        super(RegistroMantenimientoController,UsuarioMiddleware);       
    }
    routes(): void {
        this.router.get(
            '/registroMantenimientos',
            this.middleware.passAuth('jwt'),
            async (req: Request, res: Response) => {
                const mantenimientos = await this.controller.getRegistroMantenimientos(req, res);
                const edificios = await edificioController.getEdificios(req, res);
                const aulas = await aulaController.getAulas(req, res);
                const equipos = await equipoController.getEquipos(req, res);
                const tipomantenimientos = await tipomantenimientoController.getTipoMantenimientos(req, res);

                if (req.query.format === 'json') {
                    res.json({ mantenimientos, edificios, aulas, equipos, tipomantenimientos });
                } else {
                    res.render('admin/mantenimientos', { mantenimientos, edificios, aulas, equipos, tipomantenimientos, datos: {}, error: req.query.error });
                }
            }
        );

        this.router.post(
            '/crear/registroMantenimiento',
            (req: Request, res: Response) => {
                this.controller.createRegistroMantenimiento(req, res)
                .then(registroMantenimiento => res.json(registroMantenimiento))
            }
        );

        this.router.get(
            '/registroMantenimiento/:id', 
            (req: Request, res: Response) => {
                this.controller.getRegistroMantenimientoById(req, res)
                .then(registroMantenimiento => res.json(registroMantenimiento))
            }
        );

        this.router.put(
            '/registroMantenimiento/:id',
            (req: Request, res: Response) => {
                this.controller.updateRegistroMantenimiento(req, res)
                .then(registroMantenimiento => res.json(registroMantenimiento))
            }
        );
    
        this.router.delete(
            '/registroMantenimiento/:id',
            (req: Request, res: Response) => {
                this.controller.deleteRegistroMantenimiento(req, res)
                .then(registroMantenimiento => res.json(registroMantenimiento))
            }
        );

        this.router.get(
            '/registroMantenimientoInicio', 
            async (req: Request, res: Response) => {               
                this.controller.getRegistroMantenimientosInicio(req, res)
                .then(registroMantenimientoInicio => res.json(registroMantenimientoInicio))
            } 
        );
    }

}

