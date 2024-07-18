import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

export class DatabaseConfiguration {
    private static dataSource: DataSource | null = null;

    static async connect(): Promise<DataSource> {
        if (this.dataSource) {
            return this.dataSource;
        }
        this.dataSource = await AppDataSource.initialize();
        return this.dataSource;
    }

    static async disconnect(): Promise<void> {
        if (this.dataSource) {
            await this.dataSource.destroy();
            this.dataSource = null;
        }
    }

    static async getConnection(): Promise<DataSource> {
        if (!this.dataSource) {
            throw new Error('La conexión no ha sido establecida.');
        }
        return this.dataSource;
    }
}
