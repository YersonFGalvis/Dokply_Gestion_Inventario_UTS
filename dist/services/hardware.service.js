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
exports.HardwareService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const equipo_service_1 = require("./equipo.service");
class HardwareService extends serviceConfiguration_1.BaseService {
    constructor(_equipoService = new equipo_service_1.EquipoService()) {
        super(entity_1.Hardware);
        this._equipoService = _equipoService;
    }
    findHardwareById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createHardware(hardwareDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, estado, equipo_id } = hardwareDTO;
            const equipo = yield this._equipoService.findEquipoById(equipo_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${equipo_id} no encontrado`);
            }
            const newHardware = new entity_1.Hardware();
            newHardware.nombre = nombre;
            newHardware.descripcion = descripcion !== null && descripcion !== void 0 ? descripcion : '';
            newHardware.estado = estado;
            newHardware.equipo_id = equipo;
            try {
                const repository = yield this.getRepository();
                return yield repository.save(newHardware);
            }
            catch (error) {
                console.error('Error al crear el hardware:', error);
                throw error;
            }
        });
    }
    findHardwareByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOne({ where: { nombre } });
        });
    }
    findAllHardwares() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    updateHardware(id, hardwareDTO) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const hardwareToUpdate = yield repository.findOneBy({ id });
            if (!hardwareToUpdate) {
                throw new Error(`Hardware con id ${id} no encontrado`);
            }
            const equipo = yield this._equipoService.findEquipoById(hardwareDTO.equipo_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${hardwareDTO.equipo_id} no encontrado`);
            }
            repository.merge(hardwareToUpdate, {
                nombre: hardwareDTO.nombre,
                descripcion: (_a = hardwareDTO.descripcion) !== null && _a !== void 0 ? _a : '',
                estado: hardwareDTO.estado,
                equipo_id: equipo
            });
            try {
                return yield repository.save(hardwareToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el hardware:', error);
                throw error;
            }
        });
    }
    deleteHardware(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const hardwareToDelete = yield repository.findOneBy({ id });
            if (!hardwareToDelete) {
                throw new Error(`Hardware con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(hardwareToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el hardware:', error);
                throw error;
            }
        });
    }
}
exports.HardwareService = HardwareService;
//# sourceMappingURL=hardware.service.js.map