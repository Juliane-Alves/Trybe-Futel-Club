 export interface IUser {
    id: number,
    username?: string,
    role: string,
    email: string,
    password: string,
  }


  export interface ILogin {
    token?: string,
     status?: number,
     message?: string,
  }

  export interface ITeams {
    id?: number,
    teamName: string,
  }


