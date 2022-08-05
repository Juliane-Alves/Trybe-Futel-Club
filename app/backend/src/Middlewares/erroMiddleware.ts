import { Request, Response, NextFunction } from 'express';

class Error {
    static  middlewareError(err: Error, _req: Request, res: Response, _next: NextFunction){
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err  })
    }
}
export default Error;