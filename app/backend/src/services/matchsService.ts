import MatchesModel from '../database/models/MatchesModels';
import TeamModels from '../database/models/TeamsModel';
import IMatchs from '../interfaces/IMatch';

const errorNotCreat = {
  status: 401,
  message: 'It is not possible to create a match with two equal teams' 
};

const errorNotFound = {
   status: 404,
   message: 'There is no team with such id!'
}

class MatchServices {
    public static async getMatchsAll(): Promise<IMatchs[]> {

        const getMatches = await MatchesModel.findAll({
            include: [
              { model: TeamModels, as: 'teamHome', attributes: { exclude: ['id'] } },
              { model: TeamModels, as: 'teamAway', attributes: { exclude: ['id'] } },
            ],
          });  
        return getMatches;
    }


    public static async insertMatchs(data: IMatchs) {
       if (data.awayTeam === data.homeTeam) throw errorNotCreat;

       const getHomeTeam = await MatchesModel.findByPk(data.homeTeam);
       const getAwayTeam = await MatchesModel.findByPk(data.awayTeam);

       if(!getHomeTeam || !getAwayTeam ) throw errorNotFound;

       const createM = await MatchesModel.create({...data, inProgress: true});
       return createM;
    }
}

export default MatchServices;