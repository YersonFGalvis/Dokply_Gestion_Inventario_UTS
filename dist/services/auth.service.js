"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const usuario_service_1 = require("../services/usuario.service");
const Usuario_1 = require("../entity/Usuario");
class AuthService extends serviceConfiguration_1.BaseService {
    constructor(_usuarioService = new usuario_service_1.UsuarioService(), jwtInstance = jwt) {
        super(Usuario_1.Usuario);
        this._usuarioService = _usuarioService;
        this.jwtInstance = jwtInstance;
    }
    validateUser(usuario, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioByEmail = yield this._usuarioService.findPasswordByEmail(usuario);
            const usuarioByNombre = yield this._usuarioService.findPasswordByUsername(usuario);
            if (usuarioByNombre) {
                const isMatch = yield bcrypt.compare(password, usuarioByNombre.pass);
                if (isMatch) {
                    return usuarioByNombre;
                }
            }
            if (usuarioByEmail) {
                const isMatch = yield bcrypt.compare(password, usuarioByEmail.pass);
                if (isMatch) {
                    return usuarioByEmail;
                }
            }
            return null;
        });
    }
    //JWT_SECRET
    sign(payload, secret) {
        return this.jwtInstance.sign(payload, secret, { expiresIn: "1h" });
    }
    generateJWT(usuario, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioDB = yield this.validateUser(usuario, pass);
            const payload = {
                rol_id: usuarioDB.rol_id,
                id: usuarioDB.id,
            };
            if (usuarioDB) {
                usuarioDB.pass = "Not permission";
            }
            return {
                accessToken: this.sign(payload, 'MyS3Cr3t'),
                usuarioDB,
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map