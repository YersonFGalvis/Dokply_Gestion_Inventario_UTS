import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from '../config/routerConfiguration';
import { EquipoController, AulaController, ResponsableController } from '../controllers/index.controller';
import { EquipoMiddleware } from '../middlewares/equipo.middleware';
import {createPDFDocument} from '../helpers/pdf'
import { Equipo } from '../entity';

const qr = require('qr-image');
const aulaController = new AulaController();
const responsableController = new ResponsableController();

export class EquipoRouter extends BaseRouter<EquipoController, EquipoMiddleware> {

    constructor() {
        super(EquipoController, EquipoMiddleware);       
    }

    routes(): void {
        this.router.get(
            '/equipos', 
            async(req: Request, res: Response) => {
                const equipos = await this.controller.getEquipos(req, res)
                const aulas = await aulaController.getAulas(req, res);
                const responsables = await responsableController.getResponsables(req, res);

                res.render('admin/system', { equipos, statusCode: equipos.status, aulas, responsables, datos: {}, error: req.query.error }); 
            }
        );
        
        this.router.post(
            '/crear/equipo',
            (req: Request, res: Response, next: NextFunction) => {
                console.log('Entra1');
                this.middleware.equipoValidator(req, res, next);
            },
            async (req: Request, res: Response) => {
                console.log('Entra2');
                await this.controller.createEquipo(req, res);
                res.redirect('/equipos')
            }
        );

        this.router.get('/equipo/:id', async (req: Request, res: Response) => {
            this.controller.getEquipoById(req, res);
        });
          
        this.router.get('/generarQR', (req: Request, res: Response) => {
            const url = req.query.url as string;
            if (!url) {
                return res.status(400).send('URL is required');
            }
            const qrSvg = qr.image(url, { type: 'png' });
                res.type('png');
                qrSvg.pipe(res);
        });

        this.router.get('/generar-pdf/:pdf?/:id', async (req: Request, res: Response) => {
            try {
                const equipo = await this.controller.getEquipoById(req, res);
        
                const stream = res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename=Equipo_${req.params.id}.pdf`
                });
        
                createPDFDocument(equipo, (data: Buffer) => {
                    stream.write(data);
                }, () => {
                    stream.end();
                });
            } catch (error) {
                res.status(500).send('Error al generar el PDF');
            }
        });

        this.router.put(
            '/equipo/:id',
            (req: Request, res: Response) => this.controller.updateEquipo(req, res)
        );
    
        this.router.delete(
            '/equipo/:id',
            (req: Request, res: Response) => this.controller.deleteEquipo(req, res)
        );
    }
}
