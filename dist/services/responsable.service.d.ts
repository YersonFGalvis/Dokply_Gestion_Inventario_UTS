import { BaseService } from "../config/serviceConfiguration";
import { Responsable } from "../entity";
import { ResponsableDTO } from "../dto/responsable.dto";
import { CargoService } from "./cargo.service";
export declare class ResponsableService extends BaseService<Responsable> {
    private readonly _cargoService;
    constructor(_cargoService?: CargoService);
    findResponsableById(id: number): Promise<Responsable | null>;
    createResponsable(responsableDTO: ResponsableDTO): Promise<Responsable>;
    findAllResponsables(): Promise<Responsable[]>;
    updateResponsable(id: number, responsableDTO: ResponsableDTO): Promise<Responsable | null>;
    deleteResponsable(id: number): Promise<void>;
}
