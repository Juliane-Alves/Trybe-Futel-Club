import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interfaces/index';


class TeamServices {
    public static async getTeams(): Promise<ITeams[]> {
        const getTeamData = await Teams.findAll();

        return getTeamData;

    }
}

export default TeamServices;