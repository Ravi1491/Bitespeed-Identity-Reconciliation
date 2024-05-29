'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'phone_number',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'linked_id',
        references: {
          model: 'contacts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      linkPrecedence: {
        type: Sequelize.ENUM('primary', 'secondary'),
        allowNull: false,
        field: 'link_precedence',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
  },
};
