import IUser from './IUser';

interface IloginJwt {

    user: {
        id: number,
        username: string,
        role: string,
        email: string,
      },

      token: string,
}

export type IloginType =  Omit<IUser, 'password'>; 

export default IloginJwt;



