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
exports.RegistroEquipoController = void 0;
const http_1 = require("../helpers/http");
const registroEquipo_service_1 = require("../services/registroEquipo.service");
class RegistroEquipoController {
    constructor(registroEquipoService = new registroEquipo_service_1.RegistroEquipoService(), httpResponse = new http_1.HttpResponse()) {
        this.registroEquipoService = registroEquipoService;
        this.httpResponse = httpResponse;
    }
    getRegistroEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.registroEquipoService.findAllRegistroEquipos();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay Registros de equipos creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getRegistroEquipoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.registroEquipoService.findRegistroEquipoById(Number(id));
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
    createRegistroEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.registroEquipoService.createRegistroEquipo(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateRegistroEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.registroEquipoService.updateRegistroEquipo(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteRegistroEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.registroEquipoService.deleteRegistroEquipo(Number(id));
                return this.httpResponse.OK("Registro de equipo eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.RegistroEquipoController = RegistroEquipoController;
//# sourceMappingURL=registroEquipo.controller.js.map