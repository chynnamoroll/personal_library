exports.up = function up(knex) {
  return knex.schema.createTable('book_authors', (table) => {
    table.uuid('book_id').notNullable();
    table.integer('author_id').notNullable();
    table.string('role', 50).defaultTo('author');

    table.primary(['book_id', 'author_id']);

    table
      .foreign('book_id', 'fk_ba_book')
      .references('id')
      .inTable('books')
      .onDelete('CASCADE');

    table
      .foreign('author_id', 'fk_ba_author')
      .references('id')
      .inTable('authors')
      .onDelete('RESTRICT');
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists('book_authors');
};
