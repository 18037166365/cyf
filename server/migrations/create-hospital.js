'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hospital', {
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
        type: Sequelize.STRING,
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
      tableName: 'hospital',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
      queryInterface.addIndex('hospital', {
        name: 'id',
        fields: ['id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('hospital');
  }
};
