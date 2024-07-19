"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertaRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const alerta_middleware_1 = require("../middlewares/alerta.middleware");
class AlertaRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.AlertaController, alerta_middleware_1.AlertaMiddleware);
    }
    routes() {
        this.router.get('/alertas', (req, res) => this.controller.getAlertas(req, res));
        this.router.post('/crear/alerta', (req, res, next) => {
            this.middleware.alertaValidator(req, res, next);
        }, (req, res) => {
            this.controller.createAlerta(req, res);
        });
        this.router.get('/alerta/:id', (req, res) => this.controller.getAlertaById(req, res));
        this.router.put('/tipo-mantenimiento/:id', (req, res) => this.controller.updateAlerta(req, res));
        this.router.delete('/tipo-mantenimiento/:id', (req, res) => this.controller.deleteAlerta(req, res));
    }
}
exports.AlertaRouter = AlertaRouter;
//# sourceMappingURL=alerta.routes.js.map