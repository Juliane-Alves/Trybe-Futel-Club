import { DataTypes, Model } from 'sequelize';
import db from '.';
// Boa pratica a model no singular e a migration no Plural 
class User extends Model {
  public id!: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}
User.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
}); 

export default User;
