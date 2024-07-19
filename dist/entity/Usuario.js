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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const Rol_1 = require("./Rol");
const enums_1 = require("../helpers/enums");
const RegistroMantenimiento_1 = require("./RegistroMantenimiento");
let Usuario = class Usuario extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, select: false }),
    __metadata("design:type", String)
], Usuario.prototype, "pass", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Rol_1.Rol, (rol) => rol.id),
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.RoleType, default: enums_1.RoleType.USER }),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", Number)
], Usuario.prototype, "rol_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RegistroMantenimiento_1.RegistroMantenimiento, (registroMantenimiento) => registroMantenimiento.usuario_id),
    __metadata("design:type", Array)
], Usuario.prototype, "registroMantenimientos", void 0);
Usuario = __decorate([
    (0, typeorm_1.Entity)()
], Usuario);
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map