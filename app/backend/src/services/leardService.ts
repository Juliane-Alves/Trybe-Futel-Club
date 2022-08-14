import MatchServices from './matchsService';
import TeamServices from './teamService';
import IMatchs from '../interfaces/IMatch';
import { ILeader, IScores, IFinalScore, IBoard } from '../interfaces/ILeaderboard';
import { Op } from 'sequelize';

class LeaderService {

  static createTotalVictories(matchsId: IMatchs[], mode: string | number) {
     return  matchsId.reduce((acc, itemMatch ) => {
       const checkHome = mode === 'homeTeam' || itemMatch.homeTeam === mode;
       const checkAway = mode === 'awayTeam' || itemMatch.awayTeam === mode
        if (checkHome && itemMatch.homeTeamGoals > itemMatch.awayTeamGoals) return acc +1;
        if (checkAway && itemMatch.awayTeamGoals > itemMatch.homeTeamGoals) return acc +1;
        return acc;
     }, 0)
  }
  static creatDrawns(matchsId: IMatchs[], mode: string | number) {
    return  matchsId.reduce((acc, itemMatch ) => {
      const checkHome = mode === 'homeTeam' || itemMatch.homeTeam === mode;
       const checkAway = mode === 'awayTeam' || itemMatch.awayTeam === mode
      if ( checkHome && itemMatch.homeTeamGoals === itemMatch.awayTeamGoals) return acc +1;
      if ( checkAway && itemMatch.awayTeamGoals === itemMatch.homeTeamGoals) return acc +1;
      return acc;
   }, 0)
  }

  static createLosses(matchsId: IMatchs[], mode: string | number) {
    return  matchsId.reduce((acc, itemMatch) => {
      const checkHome = mode === 'homeTeam' || itemMatch.homeTeam === mode;
       const checkAway = mode === 'awayTeam' || itemMatch.awayTeam === mode
       if (checkHome && itemMatch.homeTeamGoals < itemMatch.awayTeamGoals) return acc +1;
       if (checkAway && itemMatch.awayTeamGoals < itemMatch.homeTeamGoals) return acc +1;
       return acc;
    }, 0)
 }

 static creatGoalsFavor(matchsId: IMatchs[], mode: string | number) {
  return  matchsId.reduce((acc, itemMatch ) => {
    const checkHome = mode === 'homeTeam' || itemMatch.homeTeam === mode;
    const checkAway = mode === 'awayTeam' || itemMatch.awayTeam === mode
     if (checkHome) return acc + itemMatch.homeTeamGoals;
     if (checkAway) return acc + itemMatch.awayTeamGoals;
     return acc;
  }, 0)
}

static createGoalsOwn(matchsId: IMatchs[], mode: string | number) {
  return  matchsId.reduce((acc, itemMatch ) => {
    const checkHome = mode === 'homeTeam' || itemMatch.homeTeam === mode;
    const checkAway = mode === 'awayTeam' || itemMatch.awayTeam === mode
     if (checkHome) return acc + itemMatch.awayTeamGoals;
     if (checkAway) return acc + itemMatch.homeTeamGoals;
     return acc;
  }, 0)
}

  static pointsScore(matchsId: IMatchs[], mode: string | number) {
      const totalGames = matchsId.length;
      const totalVictories = this.createTotalVictories(matchsId, mode);
      const totalDraws = this.creatDrawns(matchsId, mode);
      const totalLosses = this.createLosses(matchsId, mode);
      const goalsFavor = this.creatGoalsFavor(matchsId, mode);
      const goalsOwn = this.createGoalsOwn(matchsId, mode);
      const totalPoints = (totalVictories * 3) + totalDraws;
      const goalsBalance = goalsFavor - goalsOwn;
      const efficiency = Number((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { 
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      totalPoints,
      goalsBalance,
      efficiency,
    }
}

  public static matchRanking(leaderBoard: IBoard[]) {  // classificação por ranking
    return leaderBoard.sort((teamOne: IBoard, teamTwo: IBoard) => {
      if (teamOne.totalPoints === teamTwo.totalPoints) {
        return  (teamTwo.totalVictories - teamOne.totalVictories) 
        || (teamTwo.goalsBalance - teamOne.goalsBalance)
        || (teamTwo.goalsFavor - teamOne.goalsFavor)
        || (teamTwo.goalsOwn - teamTwo.goalsOwn)
    } 
     return (teamTwo.totalPoints - teamOne.totalPoints)
  })
  }

  public static async finishResultScoreHome(mode: string) {  // organização do resultado final dos dados do placar 
    // const generalData = await this.populatingScore(mode);
    
    const teamsAll = await TeamServices.getTeams()
    const createBoard = await Promise.all(teamsAll.map( async (team)=>{
      const getMatchsById =  await MatchServices.matchsByTeam(Number(team.id), mode);
      const newBoard = LeaderService.pointsScore(getMatchsById, mode); 
      return {
        name: team.teamName,
        ...newBoard,
      }
    }))
    LeaderService.matchRanking(createBoard);
    return createBoard;
  }

  public static async finishResultScoreAway(mode: string) {

    const teamsAll = await TeamServices.getTeams()
    const createBoard = await Promise.all(teamsAll.map( async (team)=>{
      const getMatchsById =  await MatchServices.matchsByTeam(Number(team.id), mode);
      const newBoard = LeaderService.pointsScore(getMatchsById, mode); 
      return {
        name: team.teamName,
        ...newBoard,
      }
    }))
    LeaderService.matchRanking(createBoard);
    return createBoard;
  }

  public static async finishResultScoreGeneral() {

    const teamsAll = await TeamServices.getTeams()
    const createBoard = await Promise.all(teamsAll.map( async (team)=>{
      const getMatchsById =  await MatchServices.getMatchsAll({ where: { 
        [Op.or]: [{ homeTeam: Number(team.id) },{ awayTeam: Number(team.id) }],
        inProgress: 0,
      },
      });
      const newBoard = LeaderService.pointsScore(getMatchsById, Number(team.id)); 
      return {
        name: team.teamName,
        ...newBoard,
      }
    }))
    LeaderService.matchRanking(createBoard);
    return createBoard;
  }

}

export default LeaderService;



