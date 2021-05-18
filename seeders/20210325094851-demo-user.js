'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Administrateur',
      email: 'admin@groupomania.fr',
      password: '$2b$10$pQEZwkODLxbsXA0cM5//JeXu5qso/PjiL9yT97yfJgJA7jK8pU.bO',
      isAdmin: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Utilisateur',
      email: 'user@groupomania.fr',
      password: '$2b$10$s9ApahQ.pWDrWLx5Szd9Pe4txS6tC6w5y4fpp53AwUoF73ABTYceO',
      isAdmin: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
