'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
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
      imageProfile: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png'
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
    await queryInterface.dropTable('users');
  }
};