const express = require('express');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const { validateLogin } = require('./middlewares/validateLogin');
const talkerRouter = require('./routes/talkerRouter');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'db',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'TalkerDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const app = express();

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/talker/db', async (_request, res) => {
  const [queryResponse] = await connection.execute('SELECT * FROM talkers;');
  const talkers = queryResponse.map((talker) => ({
    id: talker.id,
    name: talker.name,
    age: talker.age,
    talk: { watchedAt: talker.talk_watched_at, rate: talker.talk_rate },
  }));
  if (talkers) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }
  res.status(404).json({ message: 'Not found' });
});

app.use(talkerRouter);
app.get('/', (_request, res) => (res.status(HTTP_OK_STATUS).send()));
app.post('/login', validateLogin, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
});
app.listen(PORT, async () => {
  const [result] = await connection.execute('SELECT 1');
  if (result) {
    console.log('MySQL connection OK');
  }
  console.log('Online');
});
