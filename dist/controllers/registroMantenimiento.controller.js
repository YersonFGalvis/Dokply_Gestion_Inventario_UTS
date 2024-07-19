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
exports.RegistroMantenimientoController = void 0;
const registroMantenimientos_service_1 = require("../services/registroMantenimientos.service");
const http_1 = require("../helpers/http");
class RegistroMantenimientoController {
    constructor(registroMantenimientoService = new registroMantenimientos_service_1.RegistroMantenimientoService(), httpResponse = new http_1.HttpResponse()) {
        this.registroMantenimientoService = registroMantenimientoService;
        this.httpResponse = httpResponse;
    }
    getRegistroMantenimientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.registroMantenimientoService.findAllRegistroMantenimiento();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay mantenimientos creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getRegistroMantenimientoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.registroMantenimientoService.findRegistroMantenimientoById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el registro de Equipo");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createRegistroMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.registroMantenimientoService.createRegistroMantenimiento(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateRegistroMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.registroMantenimientoService.updateRegistroMantenimiento(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteRegistroMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.registroMantenimientoService.deleteRegistroMantenimiento(Number(id));
                return this.httpResponse.OK("Registro de mantenimiento eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.RegistroMantenimientoController = RegistroMantenimientoController;
//# sourceMappingURL=registroMantenimiento.controller.js.map