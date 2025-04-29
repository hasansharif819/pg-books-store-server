"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('books', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.date('published_date').notNullable();
        table
            .integer('author_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('authors')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTable('books');
}
