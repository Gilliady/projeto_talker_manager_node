const express = require('express');
const { getAll,
  getById,
} = require('./fs_scripts/getters_fs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, response) => {
  const selection = await getAll();
  response.status(HTTP_OK_STATUS).json(JSON.parse(selection));
});
app.get('/talker/:id', async (req, response) => {
  const selection = await getById(req.params.id);
  if (selection) {
    response.status(HTTP_OK_STATUS)
        .json(selection);
    return;
  }
  response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
