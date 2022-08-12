import { Request, Response, NextFunction } from 'express';
import JwToken from '../utils/generateJWT';

const tokenG = new JwToken()
const errorToken = { status: 401, message: 'Token must be a valid token' }

class TokenRelease  {
  public static releaseToken(req: Request, _res: Response, next: NextFunction) {
        try {

         const { authorization } = req.headers;
         tokenG.validateJWT(authorization as string)
         return next();
   
        } catch (error) {
            return next(errorToken);  
        }
  }

}

export default TokenRelease;