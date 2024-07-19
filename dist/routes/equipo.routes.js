"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipoRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const equipo_middleware_1 = require("../middlewares/equipo.middleware");
const pdf_1 = require("../helpers/pdf");
const qr = require('qr-image');
const aulaController = new index_controller_1.AulaController();
const responsableController = new index_controller_1.ResponsableController();
class EquipoRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.EquipoController, equipo_middleware_1.EquipoMiddleware);
    }
    routes() {
        this.router.get('/equipos', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const equipos = yield this.controller.getEquipos(req, res);
            const aulas = yield aulaController.getAulas(req, res);
            const responsables = yield responsableController.getResponsables(req, res);
            res.render('admin/system', { equipos, statusCode: equipos.status, aulas, responsables, datos: {}, error: req.query.error });
        }));
        this.router.post('/crear/equipo', (req, res, next) => {
            console.log('Entra1');
            this.middleware.equipoValidator(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Entra2');
            yield this.controller.createEquipo(req, res);
            res.redirect('/equipos');
        }));
        this.router.get('/equipo/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.controller.getEquipoById(req, res);
        }));
        this.router.get('/generarQR', (req, res) => {
            const url = req.query.url;
            if (!url) {
                return res.status(400).send('URL is required');
            }
            const qrSvg = qr.image(url, { type: 'png' });
            res.type('png');
            qrSvg.pipe(res);
        });
        this.router.get('/generar-pdf/:pdf?/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo = yield this.controller.getEquipoById(req, res);
                const stream = res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename=Equipo_${req.params.id}.pdf`
                });
                (0, pdf_1.createPDFDocument)(equipo, (data) => {
                    stream.write(data);
                }, () => {
                    stream.end();
                });
            }
            catch (error) {
                res.status(500).send('Error al generar el PDF');
            }
        }));
        this.router.put('/equipo/:id', (req, res) => this.controller.updateEquipo(req, res));
        this.router.delete('/equipo/:id', (req, res) => this.controller.deleteEquipo(req, res));
    }
}
exports.EquipoRouter = EquipoRouter;
//# sourceMappingURL=equipo.routes.js.map