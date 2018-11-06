'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messsage_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    chat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Chats',
        key: 'chat_id'
      }
    },
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    text: {
      type: DataTypes.STRING
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
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};