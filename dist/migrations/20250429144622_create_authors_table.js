"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('authors', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('bio');
        table.date('birthdate').notNullable();
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTable('authors');
}
