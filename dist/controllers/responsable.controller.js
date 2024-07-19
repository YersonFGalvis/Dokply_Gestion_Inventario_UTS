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
exports.ResponsableController = void 0;
const http_1 = require("../helpers/http");
const responsable_service_1 = require("../services/responsable.service");
class ResponsableController {
    constructor(responsableService = new responsable_service_1.ResponsableService(), httpResponse = new http_1.HttpResponse()) {
        this.responsableService = responsableService;
        this.httpResponse = httpResponse;
    }
    getResponsables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.responsableService.findAllResponsables();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay responsables creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getResponsableById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.responsableService.findResponsableById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Responsable");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createResponsable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.responsableService.createResponsable(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateResponsable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.responsableService.updateResponsable(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteResponsable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.responsableService.deleteResponsable(Number(id));
                return this.httpResponse.OK("Responsable eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.ResponsableController = ResponsableController;
//# sourceMappingURL=responsable.controller.js.map