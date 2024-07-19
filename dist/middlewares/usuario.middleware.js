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
exports.UsuarioMiddleware = void 0;
const usuario_dto_1 = require("../dto/usuario.dto");
const class_validator_1 = require("class-validator");
const usuario_service_1 = require("../services/usuario.service");
const enums_1 = require("../helpers/enums");
const helper_middleware_1 = require("./helper.middleware");
class UsuarioMiddleware extends helper_middleware_1.HelperMiddleware {
    constructor(_usuarioService = new usuario_service_1.UsuarioService()) {
        super();
        this._usuarioService = _usuarioService;
    }
    usuarioValidator(req, res, next) {
        const { nombre, email, pass, rol } = req.body;
        const valid = new usuario_dto_1.UsuarioDTO();
        valid.nombre = nombre;
        valid.email = email;
        valid.pass = pass;
        valid.rol = Number(rol);
        (0, class_validator_1.validate)(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, enums_1.ErrorsType.DTO);
            }
            else {
                next();
            }
        });
    }
    usuarioEmailDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const emailDB = yield this._usuarioService.findByEmail(email);
            if ((emailDB === null || emailDB === void 0 ? void 0 : emailDB.email) == email) {
                return this._httpResponse.BadRequest("Ya existe el email en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.UsuarioMiddleware = UsuarioMiddleware;
//# sourceMappingURL=usuario.middleware.js.map