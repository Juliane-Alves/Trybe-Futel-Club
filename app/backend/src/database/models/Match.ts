import { INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';
// import OtherModel from './OtherModel';

class Matches extends Model {
  id!: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'home' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'away' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'home' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'away' });

export default Matches;