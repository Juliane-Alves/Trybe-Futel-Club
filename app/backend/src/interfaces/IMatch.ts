interface IMatchs {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: number,
}

// Exportação só foi aceita assim,tentando entender  o erro
export default IMatchs;
