exports.up = function up(knex) {
  return knex.schema.createTable('books', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('isbn', 20).unique();
    table.string('title', 255).notNullable();
    table.text('description');
    table.integer('category_id').notNullable();
    table.integer('publication_year');
    table.integer('total_pages');
    table.string('status', 20).notNullable().defaultTo('unread');
    table.integer('rating');
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table
      .foreign('category_id', 'fk_books_category')
      .references('id')
      .inTable('categories')
      .onDelete('RESTRICT');

    table.check('publication_year >= ? and publication_year <= ?', [1000, 2100], 'books_publication_year_check');
    table.check('total_pages > ?', [0], 'books_total_pages_check');
    table.check('rating >= ? and rating <= ?', [1, 5], 'books_rating_check');
    table.check("status in ('unread', 'reading', 'completed', 'wishlist')", [], 'books_status_check');

    table.index('title', 'idx_books_title');
    table.index('category_id', 'idx_books_category');
    table.index('status', 'idx_books_status');
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists('books');
};
