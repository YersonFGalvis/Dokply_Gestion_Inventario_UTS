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
exports.Responsable = void 0;
const typeorm_1 = require("typeorm");
const Cargo_1 = require("./Cargo");
const RegistroEquipo_1 = require("./RegistroEquipo");
let Responsable = class Responsable {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Responsable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cargo_1.Cargo, (cargo) => cargo.id),
    (0, typeorm_1.JoinColumn)({ name: 'cargo_id' }),
    __metadata("design:type", Cargo_1.Cargo)
], Responsable.prototype, "cargo_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Responsable.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RegistroEquipo_1.RegistroEquipo, (responsableEquipo) => responsableEquipo.responsable_id),
    __metadata("design:type", Array)
], Responsable.prototype, "responsableEquipos", void 0);
Responsable = __decorate([
    (0, typeorm_1.Entity)()
], Responsable);
exports.Responsable = Responsable;
//# sourceMappingURL=Responsable.js.map