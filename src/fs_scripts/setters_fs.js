const fs = require('fs').promises;
const { join } = require('path');

const setNewTalker = async (talker) => {
    const talkersString = await fs.readFile(join(__dirname, '../talker.json'));
    const talkers = await JSON.parse(talkersString);
    const { id } = talkers.reduce((acc, curr) => ((Number(acc.id) > Number(curr.id)) ? acc : curr));
    const newTalkers = [...talkers, { ...talker, id: Number(id) + 1 }];
    await fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(newTalkers));
    return Number(id) + 1;
};

module.exports = {
    setNewTalker,
};