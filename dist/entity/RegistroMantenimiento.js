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
exports.RegistroMantenimiento = void 0;
const typeorm_1 = require("typeorm");
const Equipo_1 = require("./Equipo");
const Usuario_1 = require("./Usuario");
const TipoMantenimiento_1 = require("./TipoMantenimiento");
let RegistroMantenimiento = class RegistroMantenimiento {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RegistroMantenimiento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Equipo_1.Equipo, (equipo) => equipo.id),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_id' }),
    __metadata("design:type", Equipo_1.Equipo)
], RegistroMantenimiento.prototype, "equipo_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TipoMantenimiento_1.TipoMantenimiento, (tipoMantenimiento) => tipoMantenimiento.id),
    (0, typeorm_1.JoinColumn)({ name: 'tipo_mantenimiento_id' }),
    __metadata("design:type", TipoMantenimiento_1.TipoMantenimiento)
], RegistroMantenimiento.prototype, "tipo_mantenimiento_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RegistroMantenimiento.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], RegistroMantenimiento.prototype, "detalle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.id),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", Usuario_1.Usuario)
], RegistroMantenimiento.prototype, "usuario_id", void 0);
RegistroMantenimiento = __decorate([
    (0, typeorm_1.Entity)('registromantenimiento')
], RegistroMantenimiento);
exports.RegistroMantenimiento = RegistroMantenimiento;
//# sourceMappingURL=RegistroMantenimiento.js.map