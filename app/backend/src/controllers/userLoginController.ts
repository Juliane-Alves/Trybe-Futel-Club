import { Request, Response, NextFunction } from 'express';
import UserLoginService from '../services/loginService';

class userLoginController {
    static async dataUserLogin(req: Request, res: Response, next: NextFunction) {
        try {

          const { email, password } = req.body;

          const getUser = await UserLoginService.dataUserLogin(email, password);
          
          return res.status(200).json(getUser);
          
        } catch (error) {
          next(error);
        }
      }
      
      static userLoginValidate(req: Request, res: Response, next: NextFunction) {
        try {
          const { authorization } = req.headers;

          const dataRole = UserLoginService.userLoginValidateJWT(authorization as string);
          return res.status(200).json(dataRole);
        } catch (error) {
          next(error);
        }
      }
      
   
}

export default userLoginController;