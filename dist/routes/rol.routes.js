"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const rol_middleware_1 = require("../middlewares/rol.middleware");
class RolRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.RolController, rol_middleware_1.RolMiddleware);
    }
    routes() {
        this.router.get('/roles', (req, res) => this.controller.getRols(req, res));
        this.router.post('/crear/rol', (req, res, next) => {
            this.middleware.rolValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.rolDuplicateValidator(req, res, next);
        }, (req, res) => {
            this.controller.createRol(req, res);
        });
        this.router.get('/rol/:id', (req, res) => this.controller.getRolById(req, res));
        this.router.put('/rol/:id', (req, res) => this.controller.updateRol(req, res));
        this.router.delete('/rol/:id', (req, res) => this.controller.deleteRol(req, res));
    }
}
exports.RolRouter = RolRouter;
//# sourceMappingURL=rol.routes.js.map