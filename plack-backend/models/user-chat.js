'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserChats = sequelize.define('User-Chats', {
    chat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Chats',
        key: 'chat_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'user_id'
      }
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
  UserChats.associate = function(models) {
    // associations can be defined here

    // User.belongsTo(models.Workspace, {
    //   through: 'Workspace',
    //   foreignKey: 'workspace_id'
    // });

    // UserChats.belongsToMany(models.Chat, {
    //   through: 'Chat',
    //   foreignKey: 'chat_id',
    // })
    // UserChats.hasMany(models.Chat);
  };
  return UserChats;
};