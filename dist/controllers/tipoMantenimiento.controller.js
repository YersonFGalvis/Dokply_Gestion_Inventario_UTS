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
exports.TipoMantenimientoController = void 0;
const http_1 = require("../helpers/http");
const tipoMantenimiento_service_1 = require("../services/tipoMantenimiento.service");
class TipoMantenimientoController {
    constructor(tipoMantenimientoService = new tipoMantenimiento_service_1.TipoMantenimientoService(), httpResponse = new http_1.HttpResponse()) {
        this.tipoMantenimientoService = tipoMantenimientoService;
        this.httpResponse = httpResponse;
    }
    getTipoMantenimientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tipoMantenimientoService.findAllTipoMantenimientos();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay tipos de mantenimiento creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getTipoMantenimientoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.tipoMantenimientoService.findTipoMantenimientoById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Tipo de Mantenimiento");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createTipoMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.tipoMantenimientoService.createTipoMantenimiento(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateTipoMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.tipoMantenimientoService.updateTipoMantenimiento(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    deleteTipoMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.tipoMantenimientoService.deleteTipoMantenimiento(Number(id));
                return this.httpResponse.OK("Tipo de Mantenimiento eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
}
exports.TipoMantenimientoController = TipoMantenimientoController;
//# sourceMappingURL=tipoMantenimiento.controller.js.map