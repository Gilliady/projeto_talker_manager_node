const express = require('express');
const crypto = require('crypto');
const { validateLogin } = require('./middlewares/validateLogin');
const talkerRouter = require('./routes/talkerRouter');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.use(talkerRouter);
app.get('/', (_request, res) => (res.status(HTTP_OK_STATUS).send()));

app.post('/login', validateLogin, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
