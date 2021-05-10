'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Post= database.define('Post', {
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        comments: DataTypes.INTEGER,
    }, {
        Sequelize,
        modelName: 'Post',
        underscored: false,
        paranoid: false
    });

module.exports = Post;
