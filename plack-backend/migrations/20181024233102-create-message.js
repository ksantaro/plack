'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      messsage_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Chats',
          key: 'chat_id'
        } 
        //Do not actually reference to have many to many relationship of chats(chat,users)
      },
      sender_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },


      // SENDER ID team_id and email
      // team_id: {
      //   type: Sequelize.INTEGER,
      //   // references: {
      //   //   model: 'Users',
      //   //   key: 'team_id',
      //   // }
      // },
      // email: {
      //   type: Sequelize.STRING,
      //   // references: {
      //   //   model: 'Users',
      //   //   key: 'email',
      //   // }
      // },
      text: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};