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
exports.EdificioController = void 0;
const http_1 = require("../helpers/http");
const edificio_service_1 = require("../services/edificio.service");
class EdificioController {
    constructor(edificioService = new edificio_service_1.EdificioService(), httpResponse = new http_1.HttpResponse()) {
        this.edificioService = edificioService;
        this.httpResponse = httpResponse;
    }
    getEdificios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.edificioService.findAllEdificios();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay edificios creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getEdificioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.edificioService.findEdificioById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Edificio");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createEdificio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.edificioService.createEdificio(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateEdificio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.edificioService.updateEdificio(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteEdificio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.edificioService.deleteEdificio(Number(id));
                return this.httpResponse.OK("Edificio eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.EdificioController = EdificioController;
//# sourceMappingURL=edificio.controller.js.map