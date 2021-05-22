const express = require('express');
const router = express.Router();//Permet de charger le middleware niveau routeur

const postCtrl = require('../controllers/post');//On appelle la logique métier de nos routes
const auth = require('../middleware/auth');//On appelle le middleware d'authentification
const multer = require('../middleware/multer-config-posts');//et celui pour la gestion des images

router.post('/', auth, multer, postCtrl.createPost);//Permet de créer un post
router.patch('/:id', auth, multer, postCtrl.modifyPost);//Permet de modifier un post existant
router.delete('/:id', auth, postCtrl.deletePost);//Supprime un post

router.post('/:id/like', auth, postCtrl.likePost);//Permet de liker le post
router.get('/:id/like', auth, postCtrl.getLike);//Permet de récupérer les likes
router.get('/:idPost/like/:id', auth, postCtrl.isLiked);//Permet de récupérer les likes

router.post('/:id/comment', auth, postCtrl.commentPost);//Permet de commenter le post
router.delete('/:idPost/comment/:id', auth, postCtrl.deleteCommentPost);//Permet de commenter le post
router.get('/', auth, postCtrl.getAllPosts);//Récupère tous les posts

module.exports = router;