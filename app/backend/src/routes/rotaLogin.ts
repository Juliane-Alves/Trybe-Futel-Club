import { Router } from 'express';
import { validateLoginEmail, validateLoginPassword } from '../Middlewares/validateLogin';
import userLoginController from '../controllers/userLoginController'

const RouteLogin = Router()

RouteLogin.post('/', 
 validateLoginEmail,
 validateLoginPassword,
 userLoginController.dataUserLogin);

 RouteLogin.get('/', userLoginController.userLoginValidate) 

export default RouteLogin;