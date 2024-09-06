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
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'Gestion_Inventario_UTS',
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

