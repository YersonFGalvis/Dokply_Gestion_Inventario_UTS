import { Request, Response } from 'express';
import { HttpResponse } from '../helpers/http';
import { RolService } from '../services/rol.service';


export class RolController{
    constructor(private readonly rolService: RolService = new RolService()
    ,private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

      async getRols(req: Request, res: Response) {
      try {
          const data = await this.rolService.findAllRols();

          if(data.length === 0) {
              return this.httpResponse.NotFound("No hay roles creados en el sistema");
          }

          return this.httpResponse.OK(data)
          
      } catch (error) {
          return this.httpResponse.ServerError(error)
      }
      }

      async getRolById(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const data = await this.rolService.findRolById(Number(id));
          if (!data) {
            return this.httpResponse.NotFound( "No existe el Rol");
          }
          return this.httpResponse.OK(data);
        } catch (e:any) {
          console.error(e);
          return this.httpResponse.ServerError( e);
        }
      }


      async createRol(req: Request, res: Response) {
        try {
            const data = await this.rolService.createRol(req.body);
            return this.httpResponse.OK(data);     
          } catch (error) {
            return this.httpResponse.ServerError( "Internal server error");   
          }
        }
        
        async updateRol(req: Request, res: Response) {
          const { id } = req.params;
          try {
              const data = await this.rolService.updateRol(Number(id), req.body);
              return this.httpResponse.OK(data);
          } catch (error) {
              return this.httpResponse.ServerError("Internal server error");
          }
      }
  
      async deleteRol(req: Request, res: Response) {
          const { id } = req.params;
          try {
              await this.rolService.deleteRol(Number(id));
              return this.httpResponse.OK("Rol eliminado correctamente");
          } catch (error) {
              return this.httpResponse.ServerError("Internal server error");
          }
      }
}


