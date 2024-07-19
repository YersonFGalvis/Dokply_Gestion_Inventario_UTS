"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const enums_1 = require("../helpers/enums");
const http_1 = require("../helpers/http");
class HelperMiddleware {
    constructor(_httpResponse = new http_1.HttpResponse()) {
        this._httpResponse = _httpResponse;
    }
    passAuth(type) {
        return (req, res, next) => {
            passport_1.default.authenticate(type, { session: false }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    const message = (info === null || info === void 0 ? void 0 : info.message) || 'Unauthorized';
                    return this._httpResponse.Unauthorized(message);
                }
                req.user = user;
                next();
            })(req, res, next);
        };
    }
    checkAdminRole(req, res, next) {
        const payload = req.user;
        if (payload.rol !== enums_1.RoleType.ADMIN) {
            return this._httpResponse.Unauthorized("No tienes permiso de ADMINISTRADOR");
        }
        return next();
    }
}
exports.HelperMiddleware = HelperMiddleware;
//# sourceMappingURL=helper.middleware.js.map