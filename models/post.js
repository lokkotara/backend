'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Post= database.define('Post', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        content: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        comments: DataTypes.INTEGER,
    }, {
        Sequelize,
        modelName: 'Post',
        underscored: false,
        paranoid: false
    });

module.exports = Post;

// Post.sync({ alter: true });