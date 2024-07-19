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
exports.HardwareController = void 0;
const http_1 = require("../helpers/http");
const hardware_service_1 = require("../services/hardware.service");
class HardwareController {
    constructor(hardwareService = new hardware_service_1.HardwareService(), httpResponse = new http_1.HttpResponse()) {
        this.hardwareService = hardwareService;
        this.httpResponse = httpResponse;
    }
    getHardware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.hardwareService.findAllHardwares();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay hardware creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getHardwareById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.hardwareService.findHardwareById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Hardware");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createHardware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.hardwareService.createHardware(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateHardware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.hardwareService.updateHardware(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteHardware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.hardwareService.deleteHardware(Number(id));
                return this.httpResponse.OK("Hardware eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.HardwareController = HardwareController;
//# sourceMappingURL=hardware.controller.js.map