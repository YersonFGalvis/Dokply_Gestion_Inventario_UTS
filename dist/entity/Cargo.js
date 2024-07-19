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
exports.Cargo = void 0;
const typeorm_1 = require("typeorm");
const Area_1 = require("./Area");
const Responsable_1 = require("./Responsable");
let Cargo = class Cargo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cargo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Area_1.Area, (area) => area.id),
    (0, typeorm_1.JoinColumn)({ name: 'area_id' }),
    __metadata("design:type", Area_1.Area)
], Cargo.prototype, "area_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cargo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Responsable_1.Responsable, (responsable) => responsable.cargo_id),
    __metadata("design:type", Array)
], Cargo.prototype, "responsable", void 0);
Cargo = __decorate([
    (0, typeorm_1.Entity)()
], Cargo);
exports.Cargo = Cargo;
//# sourceMappingURL=Cargo.js.map