'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageProfile: DataTypes.STRING,
    bio: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  });
  return User;
};