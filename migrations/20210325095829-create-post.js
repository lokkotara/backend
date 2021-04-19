'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        // constraints: true,
        // onDelete: 'CASCADE',
        // hooks: true
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      likes: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      comments: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};