interface IMatchs {
  id?: number | string ,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: number | boolean,
}

// Exportação só foi aceita assim,tentando entender  o erro
export default IMatchs;
