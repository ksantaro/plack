'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    chat_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    is_channel: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
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
  Chat.associate = function(models) {
    // associations can be defined here
  };
  return Chat;
};