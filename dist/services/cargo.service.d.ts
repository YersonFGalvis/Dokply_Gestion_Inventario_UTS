import { BaseService } from "../config/serviceConfiguration";
import { Cargo } from "../entity";
import { CargoDTO } from "../dto/cargo.dto";
import { AreaService } from "./area.service";
export declare class CargoService extends BaseService<Cargo> {
    private readonly _areaService;
    constructor(_areaService?: AreaService);
    findCargoById(id: number): Promise<Cargo | null>;
    createCargo(cargoDTO: CargoDTO): Promise<Cargo>;
    findCargoByNombre(nombre: string): Promise<Cargo | null>;
    findAllCargos(): Promise<Cargo[]>;
    updateCargo(id: number, cargoDTO: CargoDTO): Promise<Cargo | null>;
    deleteCargo(id: number): Promise<void>;
}
