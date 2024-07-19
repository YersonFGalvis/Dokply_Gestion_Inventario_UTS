import { BaseService } from "../config/serviceConfiguration";
import { Edificio } from "../entity";
import { EdificioDTO } from "../dto/edificio.dto";
export declare class EdificioService extends BaseService<Edificio> {
    constructor();
    findEdificioById(id: number): Promise<Edificio | null>;
    createEdificio(body: EdificioDTO): Promise<Edificio>;
    findEdificioByNombre(nombre: string): Promise<Edificio | null>;
    findAllEdificios(): Promise<Edificio[]>;
    updateEdificio(id: number, edificioDTO: EdificioDTO): Promise<Edificio | null>;
    deleteEdificio(id: number): Promise<void>;
}
