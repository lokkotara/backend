'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const User = database.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    image: {
        type: DataTypes.STRING,
        defaultValue:'http://localhost:3000/images/avatarDefault.jpg'
    },
    bio: DataTypes.STRING,
    isAdmin: {
        type:DataTypes.BOOLEAN,
        defaultValue:0
    }
}, {
    Sequelize,
    modelName: 'User',
    underscored: false,
    paranoid: false
}, {
    classMethods: {
        associate: function(models) {
            models.User.hasMany(models.Post)
        }
    }
});

 module.exports = User;

