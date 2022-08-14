'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      home_team: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        }
      },

      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      away_team: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        }
      },

      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      in_progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches')
  }
};