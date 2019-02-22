'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chats', {
      chat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_channel: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      }
      // chat_id: {
      //   type: Sequelize.INTEGER,
        // references: {
        //   model: 'Chats',
        //   key: 'chat_id'
        // } 
        // references: {
        //   model: 'Chats',
        //   key: 'chat_id'
        // } Do not actually reference to have many to many relationship of chats(chat,users)
      // },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Chats');
  }
};