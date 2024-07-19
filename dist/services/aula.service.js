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
exports.AulaService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const edificio_service_1 = require("./edificio.service");
class AulaService extends serviceConfiguration_1.BaseService {
    constructor(_edificioService = new edificio_service_1.EdificioService()) {
        super(entity_1.Aula);
        this._edificioService = _edificioService;
    }
    findAulaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createAula(aulaDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { edificio_id, nombre } = aulaDTO;
            const edificio = yield this._edificioService.findEdificioById(edificio_id);
            if (!edificio) {
                throw new Error(`Edificio con id ${edificio_id} no encontrado`);
            }
            const newAula = new entity_1.Aula();
            newAula.edificio_id = edificio;
            newAula.nombre = nombre;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newAula);
            }
            catch (error) {
                console.error('Error al crear el aula:', error);
                throw error;
            }
        });
    }
    findAulaByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ nombre });
        });
    }
    findAllAulas() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateAula(id, aulaDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const aulaToUpdate = yield repository.findOneBy({ id });
            if (!aulaToUpdate) {
                throw new Error(`Aula con id ${id} no encontrada`);
            }
            const edificio = yield this._edificioService.findEdificioById(aulaDTO.edificio_id);
            if (!edificio) {
                throw new Error(`Edificio con id ${aulaDTO.edificio_id} no encontrado`);
            }
            repository.merge(aulaToUpdate, {
                edificio_id: edificio,
                nombre: aulaDTO.nombre
            });
            try {
                return yield repository.save(aulaToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el aula:', error);
                throw error;
            }
        });
    }
    deleteAula(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const aulaToDelete = yield repository.findOneBy({ id });
            if (!aulaToDelete) {
                throw new Error(`Aula con id ${id} no encontrada`);
            }
            try {
                yield repository.remove(aulaToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el aula:', error);
                throw error;
            }
        });
    }
}
exports.AulaService = AulaService;
//# sourceMappingURL=aula.service.js.map