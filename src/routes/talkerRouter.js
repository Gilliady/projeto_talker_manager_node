const express = require('express');
const { validateNewTalker } = require('../middlewares/validateNewTalker');
const { setNewTalker, updateTalker, deleteTalker } = require('../fs_scripts/setters_fs');
const { getById } = require('../fs_scripts/getters_fs');
const { returnAllAsJSON } = require('../utils');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.get('/talker', async (_req, res) => {
    const selection = await returnAllAsJSON();
    return res.status(HTTP_OK_STATUS).json(selection);
});

router.post('/talker', validateNewTalker, async (req, res) => {
    const id = await setNewTalker(req.body);
    return res.status(201).json({ ...req.body, id });
});

router.get('/talker/search', validateNewTalker[0], async (req, res) => {
    const { q } = req.query;
    const selection = await returnAllAsJSON();
    const filteredSelection = selection.filter((talker) => talker.name.includes(q));
    return res.status(HTTP_OK_STATUS).json(filteredSelection);
});

router.put('/talker/:id', validateNewTalker, async (req, res) => {
    const { id } = req.params;
    const updatedTalker = await updateTalker(id, req.body);
    if (!updatedTalker) {
        return res.status(404)
            .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(updatedTalker);
});

router.get('/talker/:id', async (req, res) => {
    const selection = await getById(req.params.id);
    if (selection) {
        return res.status(HTTP_OK_STATUS)
            .json(selection);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.delete('/talker/:id', validateNewTalker[0], async (req, res) => {
    const { id } = req.params;
    await deleteTalker(id);
    return res.status(204).end();
});


module.exports = router;