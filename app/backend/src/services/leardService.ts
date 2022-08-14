import MatchServices from './matchsService';
import TeamServices from './teamService';
import IMatchs from '../interfaces/IMatch';
import { ILeader, IScores, IFinalScore } from '../interfaces/ILeaderboard';

class LeaderService {

  public static getPointsHome(matchs: IMatchs, team: number): IScores {  // pontos iniciais (get HOME)
    const resultsTeam = { goalsFavor: 0, goalsOwn: 0, result: '' };
    const { homeTeam, homeTeamGoals, awayTeamGoals } = matchs;

    if (homeTeam === team) {
      resultsTeam.goalsFavor = homeTeamGoals;
      resultsTeam.goalsOwn = awayTeamGoals;

    if (homeTeamGoals > awayTeamGoals) 
      resultsTeam.result = 'victory';
    
    else if (homeTeamGoals < awayTeamGoals) 
      resultsTeam.result = 'defeat';
    
    else if (homeTeamGoals === awayTeamGoals) 
      resultsTeam.result = 'tie';
    }

    return { ...resultsTeam };
  }

  public static getAPointsAway(match: IMatchs, team: number): IScores { // get para dados iniciais da rota away (ger AWAy)
    const resultsTeam = { goalsFavor: 0, goalsOwn: 0, result: '' };
    const { awayTeam, homeTeamGoals, awayTeamGoals } = match;

    if (awayTeam === team) {
      resultsTeam.goalsFavor = awayTeamGoals;
      resultsTeam.goalsOwn = homeTeamGoals;
     }

    if (homeTeamGoals < awayTeamGoals) { 
      resultsTeam.result = 'victory';
    }
    if (homeTeamGoals > awayTeamGoals) { 
      resultsTeam.result = 'defeat';
    }
    if (homeTeamGoals === awayTeamGoals){
      resultsTeam.result = 'tie';
    }

    return { ...resultsTeam };
  }

  public static getOneScore(match: IMatchs, team: number, mode: string): IScores {  // busca por placar
    let selectedPoints;

    if (mode === 'home') selectedPoints = this.getPointsHome(match, team);
    if (mode === 'away') selectedPoints = this.getAPointsAway(match, team);
    if (mode === 'total') selectedPoints = this.getFinishScore(match, team);

    return selectedPoints as IScores;
  }

  public static async populatingScore(mode: string): Promise<ILeader[]> { // populando o placar 
    const getTeams = await TeamServices.getTeams();
    const getMatches = await MatchServices.getMatchsAll();

    const teamDataScore = getTeams.map((team) => {
      const resultsScore = { totalDraws: 0, totalVictories: 0, totalLosses: 0 };
      const resultsGoalsScore = { goalsFavor: 0, goalsOwn: 0 };

      getMatches.forEach((match) => {
        if (match.inProgress === 0) {
          const scoreData = this.getOneScore(match, team.id as number, mode);

          if (scoreData.result === 'victory') resultsScore.totalDraws += 1;

          else if (scoreData.result === 'defeat') resultsScore.totalVictories += 1;

          else if (scoreData.result === 'tie') resultsScore.totalLosses += 1;

          resultsGoalsScore.goalsFavor += scoreData.goalsFavor;

          resultsGoalsScore.goalsOwn += scoreData.goalsOwn;
        }
      });

      return { name: team.teamName, ...resultsScore, ...resultsGoalsScore };
    });

    return teamDataScore;
  }

  public static matchRanking(leaderBoard: IFinalScore[]) {  // classificação por ranking
    return leaderBoard.sort((teamOne, teamTwo) => (teamTwo.totalPoints - teamOne.totalPoints)
    || (teamTwo.totalVictories - teamOne.totalVictories)
    || (teamTwo.goalsBalance - teamOne.goalsBalance)
    || (teamTwo.goalsFavor - teamOne.goalsFavor)
    || (teamTwo.goalsOwn - teamTwo.goalsOwn));
  }

  public static async finishResultScore(mode: string) {  // organização do resultado final dos dados do placar 
    const generalData = await this.populatingScore(mode);

    const pointsScore = generalData.map((team) => {
      const organizeInfo = { 
        name: team.name,
        totalPoints: ((team.totalVictories * 3) + (team.totalDraws * 1)),
        totalGames: (team.totalVictories + team.totalDraws + team.totalLosses),
        totalVictories: team.totalVictories,
        totalDraws: team.totalDraws,
        totalLosses: team.totalLosses,
        goalsFavor: team.goalsFavor,
        goalsOwn: team.goalsOwn,
        goalsBalance: (team.goalsFavor - team.goalsOwn),
        efficiency: 0,
      };
      organizeInfo.efficiency = Number(((organizeInfo.totalPoints / (organizeInfo.totalGames * 3)) * 100).toFixed(2));
      return organizeInfo;
    });
    return this.matchRanking(pointsScore);
  }

  public static getFinishScore(match: IMatchs, team: number): IScores { // get final da seção de partidas (Get totais)
    const resultsTeam = { goalsFavor: 0, goalsOwn: 0, matchResult: '' };
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

    if (homeTeam === team) {
      resultsTeam.goalsFavor = homeTeamGoals;
      resultsTeam.goalsOwn = awayTeamGoals;
    }
    if (homeTeamGoals > awayTeamGoals) { 
      resultsTeam.matchResult = 'victory';
    }
    if (homeTeamGoals < awayTeamGoals) { 
      resultsTeam.matchResult = 'defeat';
    }
    if (homeTeamGoals === awayTeamGoals) {
      resultsTeam.matchResult = 'tie';
    }

    if (awayTeam === team) {
      resultsTeam.goalsFavor = awayTeamGoals;
      resultsTeam.goalsOwn = homeTeamGoals;
    }
    if (homeTeamGoals < awayTeamGoals) {
       resultsTeam.matchResult = 'victory';
    }
    if (homeTeamGoals > awayTeamGoals){
      resultsTeam.matchResult = 'defeat';
    } 
    if (homeTeamGoals === awayTeamGoals){
      resultsTeam.matchResult = 'tie';
    } 

    return { ...resultsTeam };
  }
}

export default LeaderService;
