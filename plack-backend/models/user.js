'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    team_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Teams',
        key: 'team_id'
      }
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Team, {
      through: 'Team',
      foreignKey: 'team_id'
    });
  };
  return User;
};
