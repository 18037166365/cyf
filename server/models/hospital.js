'use strict';
module.exports = (sequelize, Sequelize) => {
  const Hospital = sequelize.define('Hospital', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, {
    tableName: 'hospital'
  });
  return Hospital;
};
