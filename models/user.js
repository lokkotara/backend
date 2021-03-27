'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const User = database.define('User', {
    username: {
        type: DataTypes.STRING,
        unique:true
    },
    email: {
        type: DataTypes.STRING,
        unique:true
    },
    password: DataTypes.STRING,
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

