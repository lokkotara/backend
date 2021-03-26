const express = require('express');
const router = express.Router();//Permet de charger le middleware niveau routeur
const auth = require("../middleware/auth");

const userCtrl = require('../controllers/user');//On appelle la logique métier de nos routes

router.post('/signup', userCtrl.signup);//Permet de créer un nouvel utilisateur
router.post('/login', userCtrl.login);//Connecte un utilisateur existant

router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.modifyUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;