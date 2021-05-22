'use strict';
const {Sequelize,DataTypes, database} = require('../config/connexion');

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