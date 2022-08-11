import MatchesModel from '../database/models/MatchesModels';
import TeamModels from '../database/models/TeamsModel';
import IMatchs from '../interfaces/IMatch';

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
}

export default MatchServices;