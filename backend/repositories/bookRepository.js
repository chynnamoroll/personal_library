const db = require('../config/db');

const AUTHORS_AGG = db.raw(`
  coalesce(
    json_agg(json_build_object('id', authors.id, 'name', authors.name)) filter (where authors.id is not null),
    '[]'
  ) as authors
`);

function baseBookQuery() {
  return db('books')
    .select('books.*', 'categories.name as category_name', AUTHORS_AGG)
    .leftJoin('categories', 'books.category_id', 'categories.id')
    .leftJoin('book_authors', 'book_authors.book_id', 'books.id')
    .leftJoin('authors', 'authors.id', 'book_authors.author_id')
    .groupBy('books.id', 'categories.name');
}

class BookRepository {
  findAll({ categoryId, authorId } = {}) {
    const query = baseBookQuery().orderBy('books.created_at', 'desc');

    if (categoryId !== undefined) {
      query.where('books.category_id', categoryId);
    }

    if (authorId !== undefined) {
      query.whereExists(function whereHasAuthor() {
        this.select(1)
          .from('book_authors')
          .whereRaw('book_authors.book_id = books.id')
          .andWhere('book_authors.author_id', authorId);
      });
    }

    return query;
  }

  findById(id) {
    return baseBookQuery().where('books.id', id).first();
  }

  async create(data) {
    return db.transaction(async (trx) => {
      const [book] = await trx('books')
        .insert({
          title: data.title,
          isbn: data.isbn ?? null,
          description: data.description ?? null,
          category_id: data.categoryId,
          publication_year: data.publicationYear ?? null,
          total_pages: data.totalPages ?? null,
          status: data.status ?? 'unread',
          rating: data.rating ?? null,
        })
        .returning('*');

      const authorIds = data.authorIds ?? [];
      if (authorIds.length > 0) {
        await trx('book_authors').insert(
          authorIds.map((authorId) => ({ book_id: book.id, author_id: authorId })),
        );
      }

      return book;
    });
  }

  async delete(id) {
    const deletedCount = await db('books').where({ id }).delete();
    return deletedCount > 0;
  }
}

module.exports = new BookRepository();
