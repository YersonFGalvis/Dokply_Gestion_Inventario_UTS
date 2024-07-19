"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipo = void 0;
const typeorm_1 = require("typeorm");
const Aula_1 = require("./Aula");
const RegistroMantenimiento_1 = require("./RegistroMantenimiento");
const Software_1 = require("./Software");
const Hardware_1 = require("./Hardware");
const RegistroEquipo_1 = require("./RegistroEquipo");
const Alerta_1 = require("./Alerta");
let Equipo = class Equipo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Aula_1.Aula, (aula) => aula.id),
    (0, typeorm_1.JoinColumn)({ name: 'aula_id' }),
    __metadata("design:type", Aula_1.Aula)
], Equipo.prototype, "aula_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Equipo.prototype, "codigo_qr", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Equipo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Equipo.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RegistroMantenimiento_1.RegistroMantenimiento, (registroMantenimiento) => registroMantenimiento.equipo_id),
    __metadata("design:type", Array)
], Equipo.prototype, "registroMantenimientos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RegistroEquipo_1.RegistroEquipo, (responsableEquipo) => responsableEquipo.equipo_id),
    __metadata("design:type", Array)
], Equipo.prototype, "responsableEquipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Software_1.Software, (software) => software.equipo_id),
    __metadata("design:type", Array)
], Equipo.prototype, "software", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Hardware_1.Hardware, (hardware) => hardware.equipo_id),
    __metadata("design:type", Array)
], Equipo.prototype, "hardwares", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Alerta_1.Alertas, (alertas) => alertas.equipo_id),
    __metadata("design:type", Array)
], Equipo.prototype, "alertas", void 0);
Equipo = __decorate([
    (0, typeorm_1.Entity)()
], Equipo);
exports.Equipo = Equipo;
//# sourceMappingURL=Equipo.js.map