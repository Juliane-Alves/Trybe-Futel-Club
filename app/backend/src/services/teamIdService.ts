import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interfaces/index';


class TeamsIdService {
    public static async  getTeamsID(id: number): Promise<ITeams> {
        const getForId = await Teams.findByPk(id);

        return getForId as ITeams;
    }
}

export default TeamsIdService;