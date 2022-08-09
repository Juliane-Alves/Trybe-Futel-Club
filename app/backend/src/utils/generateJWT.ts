import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/index'
import 'dotenv/config';


class JwToken {
    private jwtConfig: jwt.SignOptions = {
        expiresIn: '8d',
        algorithm: 'HS256', 
    }

    private secretKey = process.env.JWT_SECRET as jwt.Secret;
    
   public  generateJWT( payload: IUser): string {
       const token = jwt.sign({ data: payload }, this.secretKey, this.jwtConfig);
       return token; 

   }

}

export default JwToken;

