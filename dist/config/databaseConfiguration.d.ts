import { DataSource } from "typeorm";
export declare class DatabaseConfiguration {
    private static dataSource;
    static connect(): Promise<DataSource>;
    static disconnect(): Promise<void>;
    static getConnection(): Promise<DataSource>;
}
