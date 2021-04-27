'use strict';
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const dotenv = require('dotenv').config ();

// const db = {};

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// User.hasMany(Post);
Post.belongsTo(User);   
Post.hasMany(Comment, { onDelete: 'cascade' });
Comment.belongsTo(Post);
Comment.belongsTo(User);

async function loadModel() {
    await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null)
    await User.sync({alter:true});
    await Post.sync({alter:true});
    await Comment.sync({alter:true});
    await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null)
};

module.exports = {User, Post, Comment, Like};