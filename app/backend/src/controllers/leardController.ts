import { Request, Response, NextFunction } from 'express';
import LeaderService from '../services/leardService';

class LeaderController {
    static async getPointsHome(_req: Request, res: Response, next: NextFunction) {
        try {
          const dataHome = await LeaderService.finishResultScoreHome('homeTeam');
          return res.status(200).json(dataHome);
        } catch (error) {
          next(error);
        } 
    }

    static async getPointsAway(_req: Request, res: Response, next: NextFunction) {
      try {
        const dataAway = await LeaderService.finishResultScoreAway('awayTeam');
        return res.status(200).json(dataAway);
      } catch (error) {
        next(error);
      } 
  }
  static async getFinishScore(_req: Request, res: Response, next: NextFunction) {
    try {
      const dataAway = await LeaderService.finishResultScoreGeneral();
      return res.status(200).json(dataAway);
    } catch (error) {
      next(error);
    } 
}

}

export default LeaderController;