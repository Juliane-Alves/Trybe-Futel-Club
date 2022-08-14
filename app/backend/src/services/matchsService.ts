import MatchesModel from '../database/models/MatchesModels';
import TeamModels from '../database/models/TeamsModel';
import IMatchs from '../interfaces/IMatch';

const errorNotCreat = {
  status: 401,
  message: 'It is not possible to create a match with two equal teams',
};

const errorNotFound = {
  status: 404,
  message: 'There is no team with such id!',
};

const errorMatchNotFound = {
  status: 404,
  message: 'match not found',
};

class MatchServices {
  public static async getMatchsAll(data: object): Promise<IMatchs[]> {
    const getMatches = await MatchesModel.findAll({
      ...data,
      include: [
        { model: TeamModels, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModels, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return getMatches as unknown as IMatchs[]; // erro devido ao tipo do in progress
  }

  public static async insertMatchs(data: IMatchs) {
    if (data.awayTeam === data.homeTeam) throw errorNotCreat;

    const getHomeTeam = await MatchesModel.findByPk(data.homeTeam);
    const getAwayTeam = await MatchesModel.findByPk(data.awayTeam);

    if (!getHomeTeam || !getAwayTeam) throw errorNotFound;

    const createM = await MatchesModel.create({ ...data, inProgress: 1 });
    return createM;
  }

  public static matchsFinish = async (id: number, body: object) => {
    const getId = await MatchesModel.findByPk(id);

    if (!getId) throw errorMatchNotFound;

    await MatchesModel.update(
      body,
      { where: { id } },
    );
  };

  public static matchsByTeam = async (id: number, data: string)  => {
    const getByTeam = await MatchesModel.findAll({where: {[data] : id, inProgress: 0}});

    return getByTeam;
     
  };
}

export default MatchServices;
