exports.seed = async function seed(knex) {
  await knex('categories').del();

  await knex('categories').insert([
    { name: 'วรรณกรรม', description: 'นวนิยายและเรื่องแต่งทั่วไป' },
    { name: 'สารคดี', description: 'เรื่องราวจากเหตุการณ์หรือชีวิตจริง' },
    { name: 'วรรณกรรมเยาวชน', description: 'หนังสือสำหรับผู้อ่านวัยเยาวชน' },
    { name: 'ธรรมะ', description: 'หนังสือธรรมะและปรัชญาชีวิต' },
  ]);
};
