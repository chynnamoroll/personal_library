exports.seed = async function seed(knex) {
  await knex('book_authors').del();
  await knex('books').del();

  const categories = await knex('categories').select('id', 'name');
  const authors = await knex('authors').select('id', 'name');

  const categoryIdByName = Object.fromEntries(categories.map((c) => [c.name, c.id]));
  const authorIdByName = Object.fromEntries(authors.map((a) => [a.name, a.id]));

  const booksToInsert = [
    { title: 'แดนสมมุติ', categoryName: 'วรรณกรรม', authorName: 'วินทร์ เลียววาริณ' },
    { title: 'เชิงตะกอน', categoryName: 'สารคดี', authorName: 'เสกสรรค์ ประเสริฐกุล' },
    { title: 'ความสุขของกะทิ', categoryName: 'วรรณกรรมเยาวชน', authorName: 'งามพรรณ เวชชาชีวะ' },
    { title: 'คู่มือมนุษย์', categoryName: 'ธรรมะ', authorName: 'พุทธทาสภิกขุ' },
  ];

  for (const entry of booksToInsert) {
    const [book] = await knex('books')
      .insert({
        title: entry.title,
        category_id: categoryIdByName[entry.categoryName],
        status: 'unread',
      })
      .returning('id');

    await knex('book_authors').insert({
      book_id: book.id,
      author_id: authorIdByName[entry.authorName],
    });
  }
};
