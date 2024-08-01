export enum RoleType {
    USUARIO = 1,
    COORDINADOR = 2,
}

export enum ErrorsType {
    DTO = "ErrorDto",
    Duplicidad = "ErrorDuplicidad"
}

export function enumValidarClave(enumClass: any, clave: string): boolean {
    return clave in enumClass;
  }
  