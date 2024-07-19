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
exports.AulaController = void 0;
const http_1 = require("../helpers/http");
const aula_service_1 = require("../services/aula.service");
class AulaController {
    constructor(aulaService = new aula_service_1.AulaService(), httpResponse = new http_1.HttpResponse()) {
        this.aulaService = aulaService;
        this.httpResponse = httpResponse;
    }
    getAulas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.aulaService.findAllAulas();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay aulas creadas en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getAulaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.aulaService.findAulaById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Aula");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createAula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.aulaService.createAula(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateAula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.aulaService.updateAula(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteAula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.aulaService.deleteAula(Number(id));
                return this.httpResponse.OK("Aula eliminada correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.AulaController = AulaController;
//# sourceMappingURL=aula.controller.js.map