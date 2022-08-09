import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/index';

class Error {
   public static  middlewareError(err: ILogin, _req: Request, res: Response, _next: NextFunction){
        if(err.status) { 
            res.status(err.status).json({ message: err.message})
        }
        res.status(500).json({ message: 'Internal server error', err  })
    }
}
export default Error;