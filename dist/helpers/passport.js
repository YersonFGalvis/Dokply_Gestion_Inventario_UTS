"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportUseJwtWithReq = exports.PassportUse = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
function PassportUse(name, Strategy, params, callback) {
    passport_1.default.use(name, new Strategy(params, callback));
}
exports.PassportUse = PassportUse;
function PassportUseJwtWithReq(name, params, callback) {
    passport_1.default.use(name, new passport_jwt_1.Strategy(params, callback));
}
exports.PassportUseJwtWithReq = PassportUseJwtWithReq;
//# sourceMappingURL=passport.js.map