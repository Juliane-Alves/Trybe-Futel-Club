import * as bcrypt from 'bcryptjs';
import User from '../database/models/UsersModel';
import { ILogin } from '../interfaces/index';
import JwToken from '../utils/generateJWT';


const tokenG = new JwToken()
const loginInvalid = { status: 401, message: 'Incorrect email or password' };

class UserLoginService {
    public static async  dataUserLogin(email: string, password: string): Promise<ILogin> {

        const dataUser = await User.findOne({ where: { email }}); 

        if(!dataUser) throw loginInvalid

        const validatePass = await bcrypt.compare(password, dataUser.password);

        if(!validatePass) throw loginInvalid;


        const token = tokenG.generateJWT(dataUser);

        return { token }

    
    }
   // const dataUser = await User.findOne({ where: { email }})

}


export default UserLoginService   