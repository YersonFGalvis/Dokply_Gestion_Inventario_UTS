"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const software_middleware_1 = require("../middlewares/software.middleware");
class SoftwareRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.SoftwareController, software_middleware_1.SoftwareMiddleware);
    }
    routes() {
        this.router.get('/software', (req, res) => this.controller.getSoftware(req, res));
        this.router.post('/crear/software', (req, res, next) => {
            this.middleware.softwareValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.softwareDuplicateValidator(req, res, next);
        }, (req, res) => {
            this.controller.createSoftware(req, res);
        });
        this.router.get('/software/:id', (req, res) => this.controller.getSoftwareById(req, res));
        this.router.put('/software/:id', (req, res) => this.controller.updateSoftware(req, res));
        this.router.delete('/software/:id', (req, res) => this.controller.deleteSoftware(req, res));
    }
}
exports.SoftwareRouter = SoftwareRouter;
//# sourceMappingURL=software.routes.js.map