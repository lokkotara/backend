'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Post= database.define('Post', {
        idUser: DataTypes.INTEGER,
        content: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        comments: DataTypes.INTEGER,
    }, {
        Sequelize,
        modelName: 'Post',
        underscored: false,
        paranoid: false
    }, {
        classMethods: {
            associate: function(models) {
                models.Post.belongsTo(models.User, {
                    foreignKey: {
                        allowNull:false,
                    },
                    constraints: true,
                    onDelete:'CASCADE',
                    hooks: true
                }),
                models.Post.hasMany(models.Comment);
                models.Post.hasMany(models.Like);

            }
        }
    });

 module.exports = Post;