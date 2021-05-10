'use strict';
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

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
// loadModel();
module.exports = {User, Post, Comment, Like};