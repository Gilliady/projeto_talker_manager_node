const express = require('express');
const crypto = require('crypto');
const { getAll,
  getById,
} = require('./fs_scripts/getters_fs');
const { validateLogin } = require('./middlewares/validateLogin');
const { validateTalker } = require('./middlewares/validateNewTalker');
const { setNewTalker } = require('./fs_scripts/setters_fs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, res) => (res.status(HTTP_OK_STATUS).send()));

app.post('/login', validateLogin, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.get('/talker', async (_req, res) => {
  const selection = await getAll();
  return res.status(HTTP_OK_STATUS).json(JSON.parse(selection));
});

app.post('/talker', validateTalker, async (req, res) => {
  const id = await setNewTalker(req.body);
  return res.status(201).json({ ...req.body, id });
});

app.get('/talker/:id', async (req, res) => {
  const selection = await getById(req.params.id);
  if (selection) {
    return res.status(HTTP_OK_STATUS)
      .json(selection);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
