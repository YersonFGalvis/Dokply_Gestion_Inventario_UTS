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
exports.AreaController = void 0;
const http_1 = require("../helpers/http");
const area_service_1 = require("../services/area.service");
class AreaController {
    constructor(areaService = new area_service_1.AreaService(), httpResponse = new http_1.HttpResponse()) {
        this.areaService = areaService;
        this.httpResponse = httpResponse;
    }
    getAreas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.areaService.findAllAreas();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay áreas creadas en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getAreaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.areaService.findAreaById(Number(id));
                if (!data) {
                    const a = this.httpResponse.NotFound("No existe el Área");
                    return this.httpResponse.NotFound("No existe el Área");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.areaService.createArea(req.body);
                // res.redirect('/areas1');
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.areaService.updateArea(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.areaService.deleteArea(Number(id));
                return this.httpResponse.OK("Área eliminada correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.AreaController = AreaController;
//# sourceMappingURL=area.controller.js.map