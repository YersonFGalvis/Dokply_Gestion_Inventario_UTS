import { BaseService } from "../config/serviceConfiguration";
import { Area } from "../entity";
import { AreaDTO } from "../dto/area.dto";
export declare class AreaService extends BaseService<Area> {
    constructor();
    findAreaById(id: number): Promise<Area | null>;
    createArea(areaDTO: AreaDTO): Promise<Area>;
    findAreaByNombre(nombre: string): Promise<Area | null>;
    findAllAreas(): Promise<Area[]>;
    updateArea(id: number, areaDTO: AreaDTO): Promise<Area | null>;
    deleteArea(id: number): Promise<void>;
}
