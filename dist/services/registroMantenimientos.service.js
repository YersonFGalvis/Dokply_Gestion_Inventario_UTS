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
exports.RegistroMantenimientoService = void 0;
const serviceConfiguration_1 = require("../config/serviceConfiguration");
const entity_1 = require("../entity");
const equipo_service_1 = require("./equipo.service");
const tipoMantenimiento_service_1 = require("./tipoMantenimiento.service");
const usuario_service_1 = require("./usuario.service");
class RegistroMantenimientoService extends serviceConfiguration_1.BaseService {
    constructor(_equipoService = new equipo_service_1.EquipoService(), _tipoMantenimientoService = new tipoMantenimiento_service_1.TipoMantenimientoService(), _usuarioService = new usuario_service_1.UsuarioService()) {
        super(entity_1.RegistroMantenimiento);
        this._equipoService = _equipoService;
        this._tipoMantenimientoService = _tipoMantenimientoService;
        this._usuarioService = _usuarioService;
    }
    findAllRegistroMantenimiento() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.find();
        });
    }
    findRegistroMantenimientoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            return repository.findOneBy({ id });
        });
    }
    createRegistroMantenimiento(registroMantenimientoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { equipo_id, tipo_mantenimiento_id, fecha, detalle, usuario_id } = registroMantenimientoDTO;
            const equipo = yield this._equipoService.findEquipoById(equipo_id);
            const tipoMantenimiento = yield this._tipoMantenimientoService.findTipoMantenimientoById(tipo_mantenimiento_id);
            const usuario = yield this._usuarioService.findById(usuario_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${equipo_id} no encontrado`);
            }
            if (!tipoMantenimiento) {
                throw new Error(`Tipo de mantenimiento con id ${tipo_mantenimiento_id} no encontrado`);
            }
            if (!usuario) {
                throw new Error(`Usuario con id ${usuario_id} no encontrado`);
            }
            const newRegistroMantenimiento = new entity_1.RegistroMantenimiento();
            newRegistroMantenimiento.equipo_id = equipo;
            newRegistroMantenimiento.tipo_mantenimiento_id = tipoMantenimiento;
            newRegistroMantenimiento.fecha = fecha;
            newRegistroMantenimiento.detalle = detalle;
            newRegistroMantenimiento.usuario_id = usuario;
            const repository = yield this.getRepository();
            try {
                return yield repository.save(newRegistroMantenimiento);
            }
            catch (error) {
                console.error('Error al crear el registro de mantenimiento:', error);
                throw error;
            }
        });
    }
    updateRegistroMantenimiento(id, registroMantenimientoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const registroMantenimientoToUpdate = yield repository.findOneBy({ id });
            if (!registroMantenimientoToUpdate) {
                throw new Error(`Registro de Mantenimiento con id ${id} no encontrado`);
            }
            const equipo = yield this._equipoService.findEquipoById(registroMantenimientoDTO.equipo_id);
            const tipoMantenimiento = yield this._tipoMantenimientoService.findTipoMantenimientoById(registroMantenimientoDTO.tipo_mantenimiento_id);
            const usuario = yield this._usuarioService.findById(registroMantenimientoDTO.usuario_id);
            if (!equipo) {
                throw new Error(`Equipo con id ${registroMantenimientoDTO.equipo_id} no encontrado`);
            }
            if (!tipoMantenimiento) {
                throw new Error(`Tipo de mantenimiento con id ${registroMantenimientoDTO.tipo_mantenimiento_id} no encontrado`);
            }
            if (!usuario) {
                throw new Error(`Usuario con id ${registroMantenimientoDTO.usuario_id} no encontrado`);
            }
            repository.merge(registroMantenimientoToUpdate, {
                equipo_id: equipo,
                tipo_mantenimiento_id: tipoMantenimiento,
                usuario_id: usuario,
                fecha: new Date(registroMantenimientoDTO.fecha),
                detalle: registroMantenimientoDTO.detalle
            });
            try {
                return yield repository.save(registroMantenimientoToUpdate);
            }
            catch (error) {
                console.error('Error al actualizar el registro de mantenimiento:', error);
                throw error;
            }
        });
    }
    deleteRegistroMantenimiento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.getRepository();
            const registroMantenimientoToDelete = yield repository.findOneBy({ id });
            if (!registroMantenimientoToDelete) {
                throw new Error(`RegistroMantenimiento con id ${id} no encontrado`);
            }
            try {
                yield repository.remove(registroMantenimientoToDelete);
            }
            catch (error) {
                console.error('Error al eliminar el registro de mantenimiento:', error);
                throw error;
            }
        });
    }
}
exports.RegistroMantenimientoService = RegistroMantenimientoService;
//# sourceMappingURL=registroMantenimientos.service.js.map