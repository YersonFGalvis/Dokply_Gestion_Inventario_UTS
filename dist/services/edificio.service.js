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
exports.EdificioService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
class EdificioService extends serviceConfiguration_1.BaseService {
    constructor() {
        super(entity_1.Edificio);
    }
    findEdificioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createEdificio(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const newEdificio = repository.create(body);
            const edificioInserted = yield repository.save(newEdificio);
            return edificioInserted;
        });
    }
    findEdificioByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ nombre });
        });
    }
    findAllEdificios() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateEdificio(id, edificioDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const edificioToUpdate = yield repository.findOneBy({ id });
            if (!edificioToUpdate) {
                throw new Error(`Edificio con id ${id} no encontrado`);
            }
            repository.merge(edificioToUpdate, edificioDTO);
            try {
                return yield repository.save(edificioToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el edificio:', error);
                throw error;
            }
        });
    }
    deleteEdificio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const edificioToDelete = yield repository.findOneBy({ id });
            if (!edificioToDelete) {
                throw new Error(`Edificio con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(edificioToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el edificio:', error);
                throw error;
            }
        });
    }
}
exports.EdificioService = EdificioService;
//# sourceMappingURL=edificio.service.js.map