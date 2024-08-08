import express from 'express';
import { UsuarioRouter } from '../routes/usuario.routes';import { RolRouter } from '../routes/rol.routes';
import { RegistroMantenimientoRouter } from '../routes/registroMantenimiento.routes';
import { AuthRouter } from '../routes/auth.routes';
import { AreaRouter } from '../routes/area.routes';
import { CargoRouter } from '../routes/cargo.routes';
import { EdificioRouter } from '../routes/edificio.routes';
import { EquipoRouter } from '../routes/equipo.routes';
import { HardwareRouter } from '../routes/hardware.routes';
import { RegistroEquipoRouter } from '../routes/registroEquipo.routes';
import { ResponsableRouter } from '../routes/responsable.routes';
import { SoftwareRouter } from '../routes/software.routes';
import { TipoMantenimientoRouter } from '../routes/tipoMantenimiento.routes';
import { AulaRouter } from '../routes/aula.routes';
import { EquipoHardwareRouter } from 'src/routes/equipoHardware.routes';
import { EquipoSoftwareRouter } from 'src/routes/equipoSoftware.routes';

export class expressConfiguration {
    public app: express.Application = express();
    private port: number = Number('3000');

    constructor() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.static('public'));
      this.app.use("/", this.routers());
      this.app.set('view engine', 'pug');
      this.app.set('views', './src/views');
    }

    routers(): Array<express.Router> {
        return [new UsuarioRouter().router, 
            new AreaRouter().router,
            new AulaRouter().router,
            new AuthRouter().router,
            new CargoRouter().router,
            new EdificioRouter().router,
            new EquipoRouter().router,
            new HardwareRouter().router,
            new RegistroEquipoRouter().router, 
            new RegistroMantenimientoRouter().router, 
            new ResponsableRouter().router, 
            new RolRouter().router, 
            new SoftwareRouter().router, 
            new TipoMantenimientoRouter().router, 
            new EquipoHardwareRouter().router, 
            new EquipoSoftwareRouter().router
        ];
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Express escuchando en el puerto ${this.port}`);
        });
    }

}
