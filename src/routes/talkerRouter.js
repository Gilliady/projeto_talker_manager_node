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

router.get('/talker/search',
    [validateNewTalker[0],
    validateNewTalker[6],
    validateNewTalker[7]], async (req, res) => {
        const { q = '', rate, date = '' } = req.query;
        let selection = await returnAllAsJSON();
        if (q !== '') {
            selection = selection.filter((talker) => talker.name
                .toLowerCase()
                .includes(q
                    .toLowerCase()));
        }
        if (rate) {
            selection = selection.filter((talker) => talker.talk.rate === Number(rate));
        }
        if (date !== '') {
            selection = selection.filter((talker) => talker.talk.watchedAt === date);
        }

        return res.status(HTTP_OK_STATUS).json(selection);
    });

const updateTalkerFunc = async (req, res, httpStatus = 200) => {
    const { id } = req.params;
    const updatedTalker = await updateTalker(id, req.body);
    if (!updatedTalker) {
        return res.status(404)
            .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return httpStatus === 200 ? res.status(httpStatus).json(updatedTalker) : res.status(204).end();
};

router.put('/talker/:id',
    validateNewTalker, (req, res) => updateTalkerFunc(req, res));

router.patch('/talker/rate/:id',
    [validateNewTalker[0],
    (req, res, next) => validateNewTalker[5]({
        body:
            { talk: { rate: req.body.rate } },
    }, res, next)],
    (req, res) => updateTalkerFunc(req, res, 204));

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