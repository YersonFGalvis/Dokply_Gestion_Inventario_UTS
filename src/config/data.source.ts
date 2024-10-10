import { DataSource, DataSourceOptions } from "typeorm";  
import {Usuario, 
  Area, 
  Equipo, 
  Hardware, 
  TipoMantenimiento, 
  Rol, 
  Software, 
  RegistroMantenimiento, 
  Aula, 
  Edificio, 
  Responsable,
  Cargo,
  RegistroEquipo,
  EquipoHardware,
  EquipoSoftware
} from '../entity';  


const Config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST!,
  port: 5432,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [Area,Aula,Cargo,Edificio,Equipo,Hardware,RegistroMantenimiento,Responsable,RegistroEquipo,Rol,Software,TipoMantenimiento,Usuario,EquipoHardware,EquipoSoftware],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  extra: {
    connectTimeoutMS: 30000 // 30 segundos
}
};
export const AppDataSource: DataSource = new DataSource(Config);

