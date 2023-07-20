const fs = require('fs').promises;
const { join } = require('path');
const { returnAllAsJSON } = require('../utils');

const path = join(__dirname, '../talker.json');
const setNewTalker = async (talker) => {
    const talkers = await returnAllAsJSON();
    const { id } = talkers.reduce((acc, curr) => ((Number(acc.id) > Number(curr.id)) ? acc : curr));
    const newTalkers = [...talkers, { ...talker, id: Number(id) + 1 }];
    await fs.writeFile(join(path), JSON.stringify(newTalkers));
    return Number(id) + 1;
};

const updateTalker = async (id, talker) => {
    const talkers = await returnAllAsJSON();
    const toUptadeTalker = talkers.find((talk) => talk.id === Number(id));
    if (!toUptadeTalker) return null;
    const updatedTalker = Object.assign(toUptadeTalker, talker);
    talkers.forEach((element, i) => {
        if (element.id === Number(id)) {
            talkers[i] = updatedTalker;
        }
    });
    await fs.writeFile(join(path), JSON.stringify(talkers));
    return updatedTalker;
};

const deleteTalker = async (id) => {
    const selection = await returnAllAsJSON();
    const newSelection = selection.filter((talker) => talker.id !== Number(id));
    await fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(newSelection));
};

module.exports = {
    setNewTalker,
    updateTalker,
    deleteTalker,
};