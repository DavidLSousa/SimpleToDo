/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('todos', function (table) {
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.index('user_id'); // Index - Otimização de buscas
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('todos', function (table) {
    table.dropIndex('user_id');
    table.dropColumn('user_id');
  });
}