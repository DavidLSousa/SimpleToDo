/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('todos').del();  
  await knex('todos').insert([
    { id: 1, title: 'Aprender Knex', completed: false },
    { id: 2, title: 'Criar API com Fastify', completed: true },
    { id: 3, title: 'Estudar JavaScript', completed: false }
  ]);
}
