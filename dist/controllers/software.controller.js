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
exports.SoftwareController = void 0;
const http_1 = require("../helpers/http");
const software_service_1 = require("../services/software.service");
class SoftwareController {
    constructor(softwareService = new software_service_1.SoftwareService(), httpResponse = new http_1.HttpResponse()) {
        this.softwareService = softwareService;
        this.httpResponse = httpResponse;
    }
    getSoftware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.softwareService.findAllSoftwares();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay software creado en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getSoftwareById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.softwareService.findSoftwareById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Software");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createSoftware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.softwareService.createSoftware(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateSoftware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.softwareService.updateSoftware(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    deleteSoftware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.softwareService.deleteSoftware(Number(id));
                return this.httpResponse.OK("Software eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
}
exports.SoftwareController = SoftwareController;
//# sourceMappingURL=software.controller.js.map