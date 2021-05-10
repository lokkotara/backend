'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Comment= database.define('Comment', {
        content: DataTypes.STRING,
    }, {
        Sequelize,
        modelName: 'Comment',
        underscored: false,
        paranoid: false
    });

module.exports = Comment;