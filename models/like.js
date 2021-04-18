'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Like= database.define('Like', {
        idPost: DataTypes.INTEGER,
        idUser: DataTypes.INTEGER
    }, {
        Sequelize,
        modelName: 'Like',
        underscored: false,
        paranoid: false
    }, {
        classMethods: {
            associate: function(models) {
                models.Like.belongsTo(models.Post, {
                    foreignKey: {
                        allowNull:false,
                    },
                    constraints: true,
                    onDelete:'CASCADE',
                    hooks: true
                })
                models.Like.belongsTo(models.User, {
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

module.exports = Like;

// Like.sync({ alter: true })