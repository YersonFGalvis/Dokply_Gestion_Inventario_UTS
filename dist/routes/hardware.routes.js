"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareRouter = void 0;
const routerConfiguration_1 = require("../config/routerConfiguration");
const index_controller_1 = require("../controllers/index.controller");
const hardware_middleware_1 = require("../middlewares/hardware.middleware");
class HardwareRouter extends routerConfiguration_1.BaseRouter {
    constructor() {
        super(index_controller_1.HardwareController, hardware_middleware_1.HardwareMiddleware);
    }
    routes() {
        this.router.get('/hardware', (req, res) => this.controller.getHardware(req, res));
        this.router.post('/crear/hardware', (req, res, next) => {
            this.middleware.hardwareValidator(req, res, next);
        }, (req, res, next) => {
            this.middleware.hardwareDuplicateValidator(req, res, next);
        }, (req, res) => {
            this.controller.createHardware(req, res);
        });
        this.router.get('/hardware/:id', (req, res) => this.controller.getHardwareById(req, res));
        this.router.put('/edificio/:id', (req, res) => this.controller.updateHardware(req, res));
        this.router.delete('/edificio/:id', (req, res) => this.controller.deleteHardware(req, res));
    }
}
exports.HardwareRouter = HardwareRouter;
//# sourceMappingURL=hardware.routes.js.map