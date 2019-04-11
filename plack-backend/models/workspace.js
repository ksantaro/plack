'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('Workspace', {
    workspace_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    workspace_url: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      // unique: true
    },
    description: {
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
  Workspace.associate = function(models) {
    // associations can be defined here
    Workspace.hasMany(models.User)
  };
  return Workspace;
};
