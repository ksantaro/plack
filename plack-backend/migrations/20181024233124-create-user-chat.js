'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User-Chats', {
      // chat_id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   // primaryKey: true, not a primary key, many UserChats to many users
      //   type: Sequelize.INTEGER
      // },      
      chat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Chats',
          key: 'chat_id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User-Chats');
  }
};