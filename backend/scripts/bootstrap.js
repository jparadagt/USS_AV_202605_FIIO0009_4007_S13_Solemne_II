const fs = require('fs');
const path = require('path');

const pool = require('../db/connection');

const sqlPath = process.env.BOOTSTRAP_SQL_PATH ||
  path.resolve(__dirname, '../../database/init.sql');

async function bootstrap() {
  const sql = fs.readFileSync(sqlPath, 'utf8');

  await pool.query(sql);

  console.log('Database bootstrap completed');
}

bootstrap()
  .catch((error) => {
    console.error('Database bootstrap failed');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    pool.end();
  });
