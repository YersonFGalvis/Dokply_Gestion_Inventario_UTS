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
exports.CargoRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const cargo_middleware_1 = require("../middlewares/cargo.middleware");
const areaController = new index_controller_1.AreaController();
class CargoRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.CargoController, cargo_middleware_1.CargoMiddleware);
    }
    routes() {
        this.router.get('/cargos', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cargos = yield this.controller.getCargos(req, res);
            const areas = yield areaController.getAreas(req, res);
            res.render('admin/cargos', { cargos, statusCode: cargos.status, areas, datos: {}, error: req.query.error });
        }));
        this.router.post('/crear/cargo', (req, res, next) => {
            this.middleware.cargoValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.cargoDuplicateValidator(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.controller.createCargo(req, res);
            res.redirect('/cargos');
        }));
        this.router.get('/cargo/:id', (req, res) => this.controller.getCargoById(req, res));
        this.router.put('/cargo/:id', (req, res) => this.controller.updateCargo(req, res));
        this.router.delete('/cargo/:id', (req, res) => this.controller.deleteCargo(req, res));
    }
}
exports.CargoRouter = CargoRouter;
//# sourceMappingURL=cargo.routes.js.map