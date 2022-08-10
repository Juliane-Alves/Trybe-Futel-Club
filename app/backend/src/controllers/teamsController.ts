import { Request, Response, NextFunction } from 'express';
import TeamServices from '../services/teamService';

class TeamsController {
    static async getTeams(req: Request, res: Response, next: NextFunction) {
        try {
          const teamsAll = await TeamServices.getTeams();
          
          return res.status(200).json(teamsAll);
        } catch (error) {
          next(error);
        } 
    }
}

export default TeamsController;