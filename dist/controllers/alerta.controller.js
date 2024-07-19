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
exports.AlertaController = void 0;
const http_1 = require("../helpers/http");
const alerta_service_1 = require("../services/alerta.service");
class AlertaController {
    constructor(alertaService = new alerta_service_1.AlertaService(), httpResponse = new http_1.HttpResponse()) {
        this.alertaService = alertaService;
        this.httpResponse = httpResponse;
    }
    getAlertas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.alertaService.findAllAlertas();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay alertas creadas en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getAlertaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.alertaService.findAlertaById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe la Alerta");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createAlerta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.alertaService.createAlerta(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateAlerta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.alertaService.updateAlerta(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteAlerta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.alertaService.deleteAlerta(Number(id));
                return this.httpResponse.OK("Alerta eliminada correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.AlertaController = AlertaController;
//# sourceMappingURL=alerta.controller.js.map