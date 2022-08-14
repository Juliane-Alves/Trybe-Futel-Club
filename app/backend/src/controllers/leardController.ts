import { Request, Response, NextFunction } from 'express';
import LeaderService from '../services/leardService';

class LeaderController {
    static async getPointsHome(req: Request, res: Response, next: NextFunction) {
        try {
          const dataHome = await LeaderService.finishResultScore('home');
          return res.status(200).json(dataHome);
        } catch (error) {
          next(error);
        } 
    }
    static async getPointsAway(req: Request, res: Response, next: NextFunction) {
      try {
        const dataAway = await LeaderService.finishResultScore('away');
        return res.status(200).json(dataAway);
      } catch (error) {
        next(error);
      }
    }
    static async getFinishScore(req: Request, res: Response, next: NextFunction) {
      try {
        const dataTotal = await LeaderService.finishResultScore('total');
        return res.status(200).json(dataTotal);
      } catch (error) {
        next(error);
      }
    }
}

export default LeaderController;