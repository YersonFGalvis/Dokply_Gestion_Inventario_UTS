import { DataSource, DataSourceOptions } from "typeorm";  
import {Usuario, 
  Alertas, 
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
  RegistroEquipo
} from '../entity';  

const Config: DataSourceOptions = {
  type: "postgres",
  host: "68.183.24.4",
  port: 5432,
  username: "postgres",
  password: "a7y5dJlyrZy7LJaP",
  database: "Gestion_Inventario_UTS",
  entities: [Alertas,Area,Aula,Cargo,Edificio,Equipo,Hardware,RegistroMantenimiento,Responsable,RegistroEquipo,Rol,Software,TipoMantenimiento,Usuario],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  extra: {
    connectTimeoutMS: 30000 // 30 segundos
}
};
export const AppDataSource: DataSource = new DataSource(Config);

