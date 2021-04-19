'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Like= database.define('Like', {
        postId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        Sequelize,
        modelName: 'Like',
        underscored: false,
        paranoid: false
    });

module.exports = Like;

// Like.sync({ alter: true })