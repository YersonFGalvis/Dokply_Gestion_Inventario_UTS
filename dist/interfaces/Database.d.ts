import { DataSource } from "typeorm";
export interface Database {
    get Connect(): Promise<DataSource>;
}
