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
     };
     
     static insertMatchs = async (req: Request, res: Response, next: NextFunction) => {
      try {

        const newMatch = await MatchServices.insertMatchs(req.body);

        return res.status(201).json(newMatch);

      } catch (error) {
        next(error);
      }
    };

    static  matchsFinish = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params
      try {
      
         await MatchServices.matchsFinish(Number(id), { inProgress: false });
        return res.status(200).json({ message: 'Finished' });
      } catch (error) {
        console.log(error)
        next(error)
      }
    };

    static  matchsUpdate = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
         await MatchServices.matchsFinish(Number(id), req.body);
        return res.status(200).json({ message: 'Finished' });
      } catch (error) {
        console.log(error)
        next(error)
      }
    };

}

export default MatchsController;