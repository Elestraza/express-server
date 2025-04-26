const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'appeals',
    password: 'ytevt.ghblevsdfnmgfhjkb',
    port: 5432,
});

pool
  .connect()
  .then((client) => {
    console.log('✅ Успешно подключено к базе данных');
    client.release(); // освобождаем соединение
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к базе данных:', err.stack);
  });


module.exports = pool;