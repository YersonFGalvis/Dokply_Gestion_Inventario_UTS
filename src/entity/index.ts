import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./Usuario";
import { Alertas } from "./Alerta";
import { Area } from "./Area";
import { Aula } from "./Aula";
import { Equipo } from "./Equipo";
import { Edificio } from "./Edificio";
import { Hardware } from "./Hardware";
import { TipoMantenimiento } from "./TipoMantenimiento";
import { Rol } from "./Rol";
import { Software } from "./Software";
import { RegistroMantenimiento } from "./RegistroMantenimiento";
import { RegistroEquipo } from "./RegistroEquipo";
import { Responsable } from "./Responsable";
import { Cargo } from "./Cargo";

// Exportar todas las entidades
export * from './Usuario';
export * from './Alerta';
export * from './Area';
export * from './Aula';
export * from './Equipo';
export * from './Edificio';
export * from './Hardware';
export * from './TipoMantenimiento';
export * from './Rol';
export * from './Software';
export * from './RegistroMantenimiento';
export * from './Responsable';
export * from './Cargo';
export * from './RegistroEquipo';