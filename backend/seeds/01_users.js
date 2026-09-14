const bcrypt = require('bcryptjs');

exports.seed = async function seed(knex) {
  await knex('users').del();

  const passwordHash = await bcrypt.hash('admin123', 10);

  await knex('users').insert([
    { username: 'admin', password_hash: passwordHash },
  ]);
};
