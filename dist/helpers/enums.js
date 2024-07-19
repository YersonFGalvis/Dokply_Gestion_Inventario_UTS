"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumValidarClave = exports.ErrorsType = exports.RoleType = void 0;
var RoleType;
(function (RoleType) {
    RoleType[RoleType["USER"] = 1] = "USER";
    RoleType[RoleType["ADMIN"] = 2] = "ADMIN";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
var ErrorsType;
(function (ErrorsType) {
    ErrorsType["DTO"] = "ErrorDto";
    ErrorsType["Duplicidad"] = "ErrorDuplicidad";
})(ErrorsType = exports.ErrorsType || (exports.ErrorsType = {}));
function enumValidarClave(enumClass, clave) {
    return clave in enumClass;
}
exports.enumValidarClave = enumValidarClave;
//# sourceMappingURL=enums.js.map