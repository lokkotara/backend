'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Comment= database.define('Comment', {
        idPost: DataTypes.INTEGER,
        idUser: DataTypes.INTEGER,
        content: DataTypes.STRING,
    }, {
        Sequelize,
        modelName: 'Comment',
        underscored: false,
        paranoid: false
    }, {
        classMethods: {
            associate: function(models) {
                models.Comment.belongsTo(models.Post, {
                    foreignKey: {
                        allowNull:false,
                    },
                    constraints: true,
                    onDelete:'CASCADE',
                    hooks: true
                })
                models.Comment.belongsTo(models.User, {
                    foreignKey: {
                        allowNull:false,
                    },
                    constraints: true,
                    onDelete:'CASCADE',
                    hooks: true
                })
            }
        }
    });

module.exports = Comment;

// Comment.sync({ alter: true })