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
exports.AulaRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const aula_middleware_1 = require("../middlewares/aula.middleware");
const edificioController = new index_controller_1.EdificioController();
class AulaRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.AulaController, aula_middleware_1.AulaMiddleware);
    }
    routes() {
        this.router.get('/aulas', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const aulas = yield this.controller.getAulas(req, res);
            const edificios = yield edificioController.getEdificios(req, res);
            res.render('admin/aulas', { aulas, statusCode: aulas.status, edificios, datos: {}, error: req.query.error });
        }));
        this.router.post('/crear/aula', (req, res, next) => {
            this.middleware.aulaValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.aulaDuplicateValidator(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.controller.createAula(req, res);
            res.redirect('/aulas');
        }));
        this.router.get('/aula/:id', (req, res) => this.controller.getAulaById(req, res));
        this.router.put('/aula/:id', (req, res) => this.controller.updateAula(req, res));
        this.router.delete('/aula/:id', (req, res) => this.controller.deleteAula(req, res));
    }
}
exports.AulaRouter = AulaRouter;
//# sourceMappingURL=aula.routes.js.map