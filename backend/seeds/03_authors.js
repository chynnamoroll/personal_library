exports.seed = async function seed(knex) {
  await knex('authors').del();

  await knex('authors').insert([
    { name: 'วินทร์ เลียววาริณ' },
    { name: 'เสกสรรค์ ประเสริฐกุล' },
    { name: 'งามพรรณ เวชชาชีวะ' },
    { name: 'พุทธทาสภิกขุ' },
  ]);
};
