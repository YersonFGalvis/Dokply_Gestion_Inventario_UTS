"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroMantenimientoRouter = void 0;
const index_controller_1 = require("../controllers/index.controller");
const routerConfiguration_1 = require("../config/routerConfiguration");
const usuario_middleware_1 = require("../middlewares/usuario.middleware");
class RegistroMantenimientoRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.RegistroMantenimientoController, usuario_middleware_1.UsuarioMiddleware);
    }
    routes() {
        this.router.get('/registroMantenimientos', (req, res) => {
            this.controller.getRegistroMantenimientos(req, res);
        });
        this.router.post('/crear/registroMantenimiento', (req, res) => {
            this.controller.createRegistroMantenimiento(req, res);
        });
        this.router.get('/registroMantenimiento/:id', (req, res) => this.controller.getRegistroMantenimientoById(req, res));
        this.router.put('/registroMantenimiento/:id', (req, res) => this.controller.updateRegistroMantenimiento(req, res));
        this.router.delete('/registroMantenimiento/:id', (req, res) => this.controller.deleteRegistroMantenimiento(req, res));
    }
}
exports.RegistroMantenimientoRouter = RegistroMantenimientoRouter;
//# sourceMappingURL=registroMantenimiento.routes.js.map