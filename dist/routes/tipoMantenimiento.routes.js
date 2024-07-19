"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoMantenimientoRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const tipoMantenimiento_middleware_1 = require("../middlewares/tipoMantenimiento.middleware");
class TipoMantenimientoRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.TipoMantenimientoController, tipoMantenimiento_middleware_1.TipoMantenimientoMiddleware);
    }
    routes() {
        this.router.get('/tipoMantenimientos', (req, res) => this.controller.getTipoMantenimientos(req, res));
        this.router.post('/crear/tipoMantenimiento', (req, res, next) => {
            this.middleware.tipoMantenimientoValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.tipoMantenimientoDuplicateValidator(req, res, next);
        }, (req, res) => {
            this.controller.createTipoMantenimiento(req, res);
        });
        this.router.get('/tipoMantenimiento/:id', (req, res) => this.controller.getTipoMantenimientoById(req, res));
        this.router.put('/tipoMantenimiento/:id', (req, res) => this.controller.updateTipoMantenimiento(req, res));
        this.router.delete('/tipoMantenimiento/:id', (req, res) => this.controller.deleteTipoMantenimiento(req, res));
    }
}
exports.TipoMantenimientoRouter = TipoMantenimientoRouter;
//# sourceMappingURL=tipoMantenimiento.routes.js.map