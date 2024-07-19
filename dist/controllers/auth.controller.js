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
exports.AuthController = void 0;
const http_1 = require("../helpers/http");
const auth_service_1 = require("../services/auth.service");
class AuthController extends auth_service_1.AuthService {
    constructor(_httpResponse = new http_1.HttpResponse()) {
        super();
        this._httpResponse = _httpResponse;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, password } = req.body;
                const encode = yield this.generateJWT(usuario, password);
                res.header("Content-Type", "application/json");
                res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 }).redirect('/dashboard');
                // res.write(JSON.stringify(encode));
                res.end();
            }
            catch (err) {
                console.error(err);
                return this._httpResponse.ServerError(err);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map