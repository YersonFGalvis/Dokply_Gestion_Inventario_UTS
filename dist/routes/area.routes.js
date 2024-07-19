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
exports.AreaRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const area_middleware_1 = require("../middlewares/area.middleware");
class AreaRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.AreaController, area_middleware_1.AreaMiddleware);
    }
    routes() {
        this.router.get('/areas', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const areas = yield this.controller.getAreas(req, res);
            res.render('admin/areas', { areas, statusCode: areas.status, error: req.query.error });
        }));
        this.router.post('/crear/area', (req, res, next) => {
            this.middleware.areaValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.areaDuplicateValidator(req, res, next);
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.controller.createArea(req, res);
            res.redirect('/areas');
        }));
        this.router.get('/area/:id', (req, res) => this.controller.getAreaById(req, res));
        this.router.put('/area/:id', (req, res) => this.controller.updateArea(req, res));
        this.router.delete('/area/:id', (req, res) => this.controller.deleteArea(req, res));
    }
}
exports.AreaRouter = AreaRouter;
//# sourceMappingURL=area.routes.js.map