export enum RoleType {
    USER = 1,
    ADMIN = 2,
}

export enum ErrorsType {
    DTO = "ErrorDto",
    Duplicidad = "ErrorDuplicidad"
}

export function enumValidarClave(enumClass: any, clave: string): boolean {
    return clave in enumClass;
  }
  