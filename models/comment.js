'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Comment= database.define('Comment', {
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Post',
                key: 'id',
            },
        },
        userId: DataTypes.INTEGER,
        content: DataTypes.STRING,
    }, {
        Sequelize,
        modelName: 'Comment',
        underscored: false,
        paranoid: false
    });

module.exports = Comment;

// Comment.sync({ alter: true })