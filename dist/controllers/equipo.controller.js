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
exports.EquipoController = void 0;
const http_1 = require("../helpers/http");
const equipo_service_1 = require("../services/equipo.service");
class EquipoController {
    constructor(equipoService = new equipo_service_1.EquipoService(), httpResponse = new http_1.HttpResponse()) {
        this.equipoService = equipoService;
        this.httpResponse = httpResponse;
    }
    getEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.equipoService.findAllEquipos();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay equipos creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getEquipoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, pdf } = req.params;
            try {
                const data = yield this.equipoService.findEquipoById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Equipo");
                }
                if (pdf) {
                    return data;
                }
                else {
                    res.render('QR', { equipo: data });
                }
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                const data = yield this.equipoService.createEquipo(req.body);
                console.log(data);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.equipoService.updateEquipo(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.equipoService.deleteEquipo(Number(id));
                return this.httpResponse.OK("Equipo eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.EquipoController = EquipoController;
//# sourceMappingURL=equipo.controller.js.map