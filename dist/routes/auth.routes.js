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
exports.AuthRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const helper_middleware_1 = require("../middlewares/helper.middleware");
const rolController = new index_controller_1.RolController();
class AuthRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.AuthController, helper_middleware_1.HelperMiddleware);
    }
    routes() {
        this.router.get('/login', (req, res) => {
            res.render('auth/login', { error: req.query.error });
        });
        this.router.get('/registro', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const roles = yield rolController.getRols(req, res);
            res.render('auth/registro', { roles, datos: {}, error: req.query.error });
        }));
        this.router.get('/settings', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const roles = yield rolController.getRols(req, res);
            res.render('admin/settings', { roles, datos: {}, error: req.query.error });
        }));
        this.router.get('/dashboard', (req, res) => {
            res.render('admin/dashboard', { error: req.query.error });
        });
        this.router.post('/login', this.middleware.passAuth("login"), (req, res) => {
            this.controller.login(req, res);
        });
    }
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=auth.routes.js.map