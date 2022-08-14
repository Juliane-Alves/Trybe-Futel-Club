export interface ILeader {
  name: string,
  totalPoints?: number,
  totalGames?: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance?: number,
  efficiency?: number,
}

export interface IScores {
  goalsFavor: number,
  goalsOwn: number,
  result?: string,
}

export interface IFinalScore {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
