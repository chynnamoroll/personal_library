require('dotenv').config();

const connection = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

module.exports = {
  client: process.env.DB_CLIENT || 'pg',
  connection,
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};
