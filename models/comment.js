// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Comment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Comment.init({
//     idPost: DataTypes.INTEGER,
//     idUser: DataTypes.INTEGER,
//     content: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Comment',
//   });
//   return Comment;
// };
'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Comment= database.define('Comment', {
        idPost: DataTypes.INTEGER,
        idUser: DataTypes.INTEGER,
        content: DataTypes.STRING,
    }, {
        Sequelize,
        modelName: 'Comment',
        underscored: false,
        paranoid: false
    }, {
        classMethods: {
            associate: function(models) {
                models.Comment.belongsTo(models.Post, {
                    foreignKey: {
                        allowNull:false,
                    },
                    constraints: true,
                    onDelete:'CASCADE',
                    hooks: true
                })
            }
        }
    });

 module.exports = Comment;