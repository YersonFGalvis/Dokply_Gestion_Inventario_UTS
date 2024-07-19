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
exports.RolMiddleware = void 0;
const rol_dto_1 = require("../dto/rol.dto");
const class_validator_1 = require("class-validator");
const http_1 = require("../helpers/http");
const rol_service_1 = require("../services/rol.service");
const enums_1 = require("../helpers/enums");
class RolMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse, _rolService = new rol_service_1.RolService()) {
        this._httpResponse = _httpResponse;
        this._rolService = _rolService;
    }
    rolValidator(req, res, next) {
        const valid = new rol_dto_1.RolDTO();
        Object.assign(valid, req.body);
        (0, class_validator_1.validate)(valid).then((err) => {
            if (err.length > 0) {
                return this._httpResponse.BadRequest(err, enums_1.ErrorsType.DTO);
            }
            else {
                next();
            }
        });
    }
    rolDuplicateValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            const rolDB = yield this._rolService.findRolByNombre(nombre);
            if ((rolDB === null || rolDB === void 0 ? void 0 : rolDB.nombre) == nombre) {
                return this._httpResponse.BadRequest("Ya existe el Rol en el sistema", enums_1.ErrorsType.Duplicidad);
            }
            else {
                next();
            }
        });
    }
}
exports.RolMiddleware = RolMiddleware;
//# sourceMappingURL=rol.middleware.js.map