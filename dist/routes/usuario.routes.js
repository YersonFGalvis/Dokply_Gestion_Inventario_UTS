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
exports.UsuarioRouter = void 0;
const index_controller_1 = require("../controllers/index.controller");
const routerConfiguration_1 = require("../config/routerConfiguration");
const usuario_middleware_1 = require("../middlewares/usuario.middleware");
const rolController = new index_controller_1.RolController();
class UsuarioRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.UsuarioController, usuario_middleware_1.UsuarioMiddleware);
    }
    routes() {
        this.router.get('/usuarios', 
        // this.middleware.passAuth("jwt"),
        // (req: Request, res: Response, next: NextFunction) => {
        //     this.middleware.checkAdminRole(req, res, next);
        // },
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.controller.getUsers(req, res);
            const roles = yield rolController.getRols(req, res);
            res.render('admin/user', { users, roles, datos: {}, error: req.query.error });
        }));
        this.router.post('/crear/usuario', (req, res, next) => {
            this.middleware.usuarioValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.usuarioEmailDuplicateValidator(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.controller.createUser(req, res);
            res.redirect('/usuarios');
        }));
        this.router.get("/usuarios/usuario-rol/:id", (req, res) => this.controller.getUserWithRolById(req, res));
        this.router.put('/usuarios/:id', (req, res) => this.controller.updateUser(req, res));
        this.router.delete('/usuarios/:id', (req, res) => this.controller.deleteUser(req, res));
    }
}
exports.UsuarioRouter = UsuarioRouter;
//# sourceMappingURL=usuario.routes.js.map