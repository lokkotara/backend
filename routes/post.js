const express = require('express');
const router = express.Router();//Permet de charger le middleware niveau routeur

const postCtrl = require('../controllers/post');//On appelle la logique métier de nos routes
const auth = require('../middleware/auth');//On appelle le middleware d'authentification
const multer = require('../middleware/multer-config');//et celui pour la gestion des images

router.post('/', postCtrl.createPost);//Permet de créer un post
router.patch('/:id', auth, multer, postCtrl.modifyPost);//Permet de modifier un post existant
router.delete('/:id', auth, postCtrl.deletePost);//Supprime un post
router.post('/:id/like', auth, postCtrl.likePost);//Permet de liker le post
router.get('/:id', auth, postCtrl.getOnePost);//Récupère un seul post
router.get('/', auth, postCtrl.getAllPosts);//Récupère tous les posts

module.exports = router;

