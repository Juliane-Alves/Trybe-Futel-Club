import { Request, Response, NextFunction } from 'express';
import TeamsIdService from '../services/teamIdService';

class TeamsIdController {
    static async getTeamsID(req: Request, res: Response, next: NextFunction) {
        try {
          const { id } = req.params;
          const getForId = await TeamsIdService.getTeamsID(Number(id));
          
          return res.status(200).json(getForId);
        } catch (error) {
          next(error);
        } 
    }
}

export default TeamsIdController;