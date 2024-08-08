import "reflect-metadata";
import { DatabaseConfiguration } from "./config/databaseConfiguration";
import { expressConfiguration } from "./config/expressConfiguration";
import { LoginStrategy } from "./strategies/login.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { CronMandarEmail } from "./helpers/cron";


class Server extends DatabaseConfiguration {
    public app: expressConfiguration = new expressConfiguration();

    constructor() {
        super();
        this.passportUse();
        this.dbConnect();
        this.app.listen();
        CronMandarEmail();
    }

    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use];
    }

    async dbConnect(): Promise<void> {
        try {
          await DatabaseConfiguration.connect();
            console.log("Conectado a la base de datos");
        } catch (err) {
            console.error(err);
        }
    }
}

new Server();
