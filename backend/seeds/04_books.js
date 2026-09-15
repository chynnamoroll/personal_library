const REAL_BOOKS = [
  { title: 'แดนสมมุติ', categoryName: 'วรรณกรรม', authorNames: ['วินทร์ เลียววาริณ'] },
  { title: 'เชิงตะกอน', categoryName: 'สารคดี', authorNames: ['เสกสรรค์ ประเสริฐกุล'] },
  { title: 'ความสุขของกะทิ', categoryName: 'วรรณกรรมเยาวชน', authorNames: ['งามพรรณ เวชชาชีวะ'] },
  { title: 'คู่มือมนุษย์', categoryName: 'ธรรมะ', authorNames: ['พุทธทาสภิกขุ'] },
];

const TITLE_ADJECTIVES = [
  'เงา', 'แสง', 'สาย', 'ฟ้า', 'ดิน', 'ทะเล', 'ภูเขา', 'สายลม',
  'รุ้ง', 'หมอก', 'ดาว', 'จันทร์', 'อรุณ', 'สนธยา', 'พลิ้ว', 'ไพร',
  'ราตรี', 'วสันต์',
];

const TITLE_NOUNS = [
  'ฝัน', 'เวลา', 'ทาง', 'บ้าน', 'เมือง', 'คน', 'หัวใจ', 'ความทรงจำ',
  'ชีวิต', 'โลก', 'ฤดูกาล', 'นิทาน', 'เรื่องเล่า', 'บทเพลง', 'ตำนาน', 'แผ่นดิน',
  'ปีกนก', 'สายน้ำ',
];

const GENERATED_AUTHOR_NAMES = [
  'สมชาย ศรีสุข', 'สุนีย์ แสงทอง', 'ประภา บุญมา', 'อรุณ วงศ์ไพร',
  'กมล เกียรติคุณ', 'ปิยะ พงษ์พันธุ์', 'ธิดา รัตนากร', 'วิชัย จันทรา',
  'มาลี ทองดี', 'สุรีย์ ไพศาล', 'ชาญ ประเสริฐกุล', 'นภา เกียรติคุณ',
];

const GENERATED_CATEGORY_NAMES = ['วรรณกรรม', 'สารคดี', 'วรรณกรรมเยาวชน', 'ธรรมะ', 'บทกวี', 'ประวัติศาสตร์'];

const STATUS_CYCLE = ['unread', 'reading', 'completed', 'wishlist'];

const TOTAL_BOOKS = 50;

function buildGeneratedTitle(index) {
  const adjective = TITLE_ADJECTIVES[index % TITLE_ADJECTIVES.length];
  const noun = TITLE_NOUNS[Math.floor(index / TITLE_ADJECTIVES.length) % TITLE_NOUNS.length];
  return `${adjective}${noun}`;
}

function buildGeneratedBooks() {
  const generatedCount = TOTAL_BOOKS - REAL_BOOKS.length;

  return Array.from({ length: generatedCount }, (_, index) => {
    const categoryName = GENERATED_CATEGORY_NAMES[index % GENERATED_CATEGORY_NAMES.length];
    const primaryAuthor = GENERATED_AUTHOR_NAMES[index % GENERATED_AUTHOR_NAMES.length];
    const authorNames = [primaryAuthor];

    if (index % 5 === 0) {
      const secondAuthor = GENERATED_AUTHOR_NAMES[(index + 4) % GENERATED_AUTHOR_NAMES.length];
      if (secondAuthor !== primaryAuthor) {
        authorNames.push(secondAuthor);
      }
    }

    return {
      title: buildGeneratedTitle(index),
      categoryName,
      authorNames,
      publicationYear: 1990 + (index % 34),
      totalPages: 120 + (index % 20) * 15,
      status: STATUS_CYCLE[index % STATUS_CYCLE.length],
      rating: (index % 5) + 1,
    };
  });
}

exports.seed = async function seed(knex) {
  const categories = await knex('categories').select('id', 'name');
  const authors = await knex('authors').select('id', 'name');

  const categoryIdByName = Object.fromEntries(categories.map((c) => [c.name, c.id]));
  const authorIdByName = Object.fromEntries(authors.map((a) => [a.name, a.id]));

  const allBooks = [...REAL_BOOKS, ...buildGeneratedBooks()];

  for (const entry of allBooks) {
    const [book] = await knex('books')
      .insert({
        title: entry.title,
        category_id: categoryIdByName[entry.categoryName],
        publication_year: entry.publicationYear ?? null,
        total_pages: entry.totalPages ?? null,
        status: entry.status ?? 'unread',
        rating: entry.rating ?? null,
      })
      .returning('id');

    await knex('book_authors').insert(
      entry.authorNames.map((name) => ({ book_id: book.id, author_id: authorIdByName[name] })),
    );
  }
};
