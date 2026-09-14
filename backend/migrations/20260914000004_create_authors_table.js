exports.up = function up(knex) {
  return knex.schema.createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name', 150).notNullable();
    table.text('biography');
    table.date('birth_date');
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.index('name', 'idx_authors_name');
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists('authors');
};
