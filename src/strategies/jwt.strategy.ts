import { StrategyOptionsWithRequest, ExtractJwt } from "passport-jwt";
import { PayloadToken } from "../interfaces/auth.interface";
import { PassportUseJwtWithReq } from "../helpers/passport";

export class JwtStrategy {
  constructor() {  
  }

  async validate(req: any, payLoad: PayloadToken, done: (error: any, user?: any) => void) {
    done(null, payLoad);
  }

  get use() {
    return PassportUseJwtWithReq(
      "jwt",
      {
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromExtractors([ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), req => req.cookies['accessToken']])])]),
        secretOrKey: "MyS3Cr3t",
        passReqToCallback: true 
      },
      this.validate
    );
  }
}
