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
exports.ResponsableRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const responsable_middleware_1 = require("../middlewares/responsable.middleware");
const cargoController = new index_controller_1.CargoController();
class ResponsableRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.ResponsableController, responsable_middleware_1.ResponsableMiddleware);
    }
    routes() {
        this.router.get('/responsables', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const responsables = yield this.controller.getResponsables(req, res);
            const cargos = yield cargoController.getCargos(req, res);
            res.render('admin/responsables', { responsables, statusCode: responsables.status, cargos, datos: {}, error: req.query.error });
        }));
        this.router.post('/crear/responsable', (req, res, next) => {
            this.middleware.responsableValidator(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.controller.createResponsable(req, res);
            res.redirect('/responsables');
        }));
        this.router.get('/responsable/:id', (req, res) => this.controller.getResponsableById(req, res));
        this.router.put('/responsable/:id', (req, res) => this.controller.updateResponsable(req, res));
        this.router.delete('/responsable/:id', (req, res) => this.controller.deleteResponsable(req, res));
    }
}
exports.ResponsableRouter = ResponsableRouter;
//# sourceMappingURL=responsable.routes.js.map