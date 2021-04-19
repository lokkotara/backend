'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        onDelete: 'CASCADE',
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique:true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};