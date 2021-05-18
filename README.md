# Projet 7 - Groupomania
## Vue d'ensemble du projet
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.
Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues. 
je dois fournir une première version d’une des fonctionnalités proposées par Groupomania et j’ai carte blanche concernant la forme que cela va prendre

## Que dois-je réaliser ?
Voici la partie backend de l'application qui doit utiliser le langage SQL. Pour réaliser cela, je me suis servi de sequelize.

## Installation du back-end
Après avoir cloné le repository, Il vous faudra installer les packages avec `npm install`.

Vous devrez faire une copie du fichier `.env.example` que vous mettrez au même niveau (racine du backend). Il vous faudra ensuite le renommer en `.env` et remplir les informations de connexion nécessaires.

## Lancement du back-end
Une fois terminé, vous pourrez lancer l'API en tapant `nodemon server` dans la console

## Création de la base de données
Lancez la commande `npx sequelize db:migrate` pour générer les tables utiles au fonctionnement de l'appli.
Vous pouvez aussi ajouter 2 profils d'utilisateurs (un utilisatur et un administateur) dans la base de donnée avec la commande `npx sequelize db:seed:all`