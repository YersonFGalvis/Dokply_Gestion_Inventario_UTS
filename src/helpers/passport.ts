import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, StrategyOptions, StrategyOptionsWithRequest } from "passport-jwt";

type TypeStrategy<T, U, X> = { new (params: U, callback: X): T };
type JwtCallbackWithReq = (req: any, payload: any, done: (error: any, user?: any) => void) => void;



export function PassportUse<T extends LocalStrategy, U, X>(
  name: string,
  Strategy: TypeStrategy<T, U, X>,
  params: U,
  callback: X
) {
  passport.use(name, new Strategy(params, callback));
}

export function PassportUseJwtWithReq(
    name: string,
    params: StrategyOptionsWithRequest,
    callback: JwtCallbackWithReq
  ) {
    passport.use(name, new JwtStrategy(params, callback));
  }
  
