'use strict';
module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define('News', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    from: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    tableName: 'news'
  });
  return News;
};
