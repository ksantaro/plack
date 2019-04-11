'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    workspace_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Workspaces',
        key: 'workspace_id'
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
    },
    password: {
        type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Workspace, {
      through: 'Workspace',
      foreignKey: 'workspace_id'
    });

    // User.hasMany(models['User-Chats'])

    User.belongsToMany(models.Chat, {through: 'User-Chats'})

  };
  return User;
};