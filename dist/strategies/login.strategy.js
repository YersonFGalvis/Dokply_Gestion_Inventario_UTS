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
exports.LoginStrategy = void 0;
const passport_1 = require("../helpers/passport");
const auth_service_1 = require("../services/auth.service");
const passport_local_1 = require("passport-local");
const _authService = new auth_service_1.AuthService();
class LoginStrategy {
    validate(usuario, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioCheck = yield _authService.validateUser(usuario, password);
            if (usuarioCheck == null) {
                return done(null, false, { message: "Usuario o contraseña invalidos" });
            }
            return done(null, usuarioCheck);
        });
    }
    get use() {
        return (0, passport_1.PassportUse)("login", passport_local_1.Strategy, { usernameField: "usuario", passwordField: "password" }, this.validate);
    }
}
exports.LoginStrategy = LoginStrategy;
//# sourceMappingURL=login.strategy.js.map