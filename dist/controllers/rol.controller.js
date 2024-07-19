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
exports.RolController = void 0;
const http_1 = require("../helpers/http");
const rol_service_1 = require("../services/rol.service");
class RolController {
    constructor(rolService = new rol_service_1.RolService(), httpResponse = new http_1.HttpResponse()) {
        this.rolService = rolService;
        this.httpResponse = httpResponse;
    }
    getRols(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.rolService.findAllRols();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay roles creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getRolById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.rolService.findRolById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Rol");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.rolService.createRol(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    updateRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.rolService.updateRol(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    deleteRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.rolService.deleteRol(Number(id));
                return this.httpResponse.OK("Rol eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
}
exports.RolController = RolController;
//# sourceMappingURL=rol.controller.js.map