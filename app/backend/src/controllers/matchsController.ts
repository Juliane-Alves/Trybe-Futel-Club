import { Request, Response, NextFunction } from 'express';
import MatchServices from '../services/matchsService';


class MatchsController {
     static async getMatchsAll(req: Request, res: Response, next: NextFunction) {
         try {
            const getMatches = await MatchServices.getMatchsAll();

            return res.status(200).json(getMatches);

         } catch(error) {
            next(error);
         }
     }
     
     static insertMatchs = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;

        const newMatch = await MatchServices.insertMatchs({
          homeTeam,
          homeTeamGoals,
          awayTeam,
          awayTeamGoals,
          inProgress: true,
        });

        return res.status(201).json(newMatch);

      } catch (error) {
        next(error);
      }
    };
}

export default MatchsController;