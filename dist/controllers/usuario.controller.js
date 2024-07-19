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
exports.UsuarioController = void 0;
const usuario_service_1 = require("../services/usuario.service");
const http_1 = require("../helpers/http");
class UsuarioController {
    constructor(userService = new usuario_service_1.UsuarioService(), httpResponse = new http_1.HttpResponse()) {
        this.userService = userService;
        this.httpResponse = httpResponse;
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.findAllUser();
                if (data.length === 0) {
                    return this.httpResponse.NotFound("No hay usuarios creados en el sistema");
                }
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError(error);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.userService.findById(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("No existe el Usuario");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.createUser(req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Internal server error");
            }
        });
    }
    getUserWithRolById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.userService.findUserWithRole(Number(id));
                if (!data) {
                    return this.httpResponse.NotFound("Usuario encontrado");
                }
                return this.httpResponse.OK(data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.ServerError(e);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.userService.updateUser(Number(id), req.body);
                return this.httpResponse.OK(data);
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield this.userService.deleteUser(Number(id));
                if (result.affected === 0) {
                    return this.httpResponse.NotFound("Usuario no encontrado");
                }
                return this.httpResponse.OK("Usuario eliminado correctamente");
            }
            catch (error) {
                return this.httpResponse.ServerError("Error interno del servidor");
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map