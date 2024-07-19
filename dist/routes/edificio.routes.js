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
exports.EdificioRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const edificio_middleware_1 = require("../middlewares/edificio.middleware");
class EdificioRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.EdificioController, edificio_middleware_1.EdificioMiddleware);
    }
    routes() {
        this.router.get('/edificios', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const edificios = yield this.controller.getEdificios(req, res);
            res.render('admin/edificios', { edificios, statusCode: edificios.status, datos: {}, error: req.query.error });
        }));
        this.router.post('/crear/edificio', (req, res, next) => {
            this.middleware.edificioValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.edificioDuplicateValidator(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.controller.createEdificio(req, res);
            res.redirect('/edificios');
        }));
        this.router.get('/edificio/:id', (req, res) => this.controller.getEdificioById(req, res));
        this.router.put('/edificio/:id', (req, res) => this.controller.updateEdificio(req, res));
        this.router.delete('/edificio/:id', (req, res) => this.controller.deleteEdificio(req, res));
    }
}
exports.EdificioRouter = EdificioRouter;
//# sourceMappingURL=edificio.routes.js.map