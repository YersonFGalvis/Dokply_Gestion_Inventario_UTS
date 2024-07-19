import { BaseService } from "../config/serviceConfiguration";
import { Aula } from "../entity";
import { AulaDTO } from "../dto/aula.dto";
import { EdificioService } from "./edificio.service";
export declare class AulaService extends BaseService<Aula> {
    private readonly _edificioService;
    constructor(_edificioService?: EdificioService);
    findAulaById(id: number): Promise<Aula | null>;
    createAula(aulaDTO: AulaDTO): Promise<Aula>;
    findAulaByNombre(nombre: string): Promise<Aula | null>;
    findAllAulas(): Promise<Aula[]>;
    updateAula(id: number, aulaDTO: AulaDTO): Promise<Aula | null>;
    deleteAula(id: number): Promise<void>;
}
