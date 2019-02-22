'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
    // user_id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: Sequelize.INTEGER
    // },
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    workspace_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Workspaces',
        key: 'workspace_id'
      }
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        // validate: {
        //     isEmail: true
        // }
    },
    password: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Users');
  }
};

// .then(() => {
  //   return queryInterface.sequelize.query('ALTER TABLE "Users" ADD CONSTRAINT "user_key" PRIMARY KEY ("team_id", "email")');
  // });