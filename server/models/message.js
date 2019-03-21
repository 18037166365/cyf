'use strict';
module.exports = (sequelize, Sequelize) => {
  const Messages = sequelize.define('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    phoneNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    content: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'messages'
  });
  return Messages;
};
