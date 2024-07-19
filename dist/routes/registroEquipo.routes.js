"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroEquipoRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const registroEquipo_middleware_1 = require("../middlewares/registroEquipo.middleware");
class RegistroEquipoRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.RegistroEquipoController, registroEquipo_middleware_1.RegistroEquipoMiddleware);
    }
    routes() {
        this.router.get('/registroEquipos', (req, res) => this.controller.getRegistroEquipos(req, res));
        this.router.post('/crear/registroEquipo', (req, res, next) => {
            this.middleware.registroEquipoValidator(req, res, next);
        }, (req, res) => {
            this.controller.createRegistroEquipo(req, res);
        });
        this.router.get('/registroEquipo/:id', (req, res) => this.controller.getRegistroEquipoById(req, res));
        this.router.put('/registroEquipo/:id', (req, res) => this.controller.updateRegistroEquipo(req, res));
        this.router.delete('/registroEquipo/:id', (req, res) => this.controller.deleteRegistroEquipo(req, res));
    }
}
exports.RegistroEquipoRouter = RegistroEquipoRouter;
//# sourceMappingURL=registroEquipo.routes.js.map