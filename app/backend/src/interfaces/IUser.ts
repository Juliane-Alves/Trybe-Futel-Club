import { type } from "os";

interface  IUser {
    username: string,
    email: string, 
    role: string,
    password: string, 
}

export type IUserLogin = Omit<IUser, 'role' | 'username'>

export default IUser;