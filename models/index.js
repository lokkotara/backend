'use strict';
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// Définit les relations entre les tables
Post.belongsTo(User);   
Post.hasMany(Comment, { onDelete: 'cascade' });
Comment.belongsTo(Post);
Comment.belongsTo(User);

module.exports = {User, Post, Comment, Like};