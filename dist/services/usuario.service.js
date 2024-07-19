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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const rol_service_1 = require("./rol.service");
class UsuarioService extends serviceConfiguration_1.BaseService {
    constructor(rolService = new rol_service_1.RolService()) {
        super(entity_1.Usuario);
        this.rolService = rolService;
    }
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find({ relations: ['rol_id'] });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ email });
        });
    }
    findPasswordByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository
                .createQueryBuilder("usuario")
                .addSelect("usuario.pass")
                .where("usuario.email = :email", { email })
                .getOne();
        });
    }
    findPasswordByUsername(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository
                .createQueryBuilder("usuario")
                .addSelect("usuario.pass")
                .where("usuario.nombre = :nombre", { nombre })
                .getOne();
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const newUser = repository.create(body);
            newUser.pass = yield bcrypt_1.default.hash(newUser.pass, 10);
            newUser.rol_id = body.rol;
            return repository.save(newUser);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.delete(id);
        });
    }
    updateUser(id, infoUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.update(id, infoUpdate);
        });
    }
    findUserWithRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository
                .createQueryBuilder("usuario")
                .leftJoinAndSelect("usuario.rol_id", "rol")
                .where("usuario.id = :id", { id })
                .getOne();
        });
    }
}
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map