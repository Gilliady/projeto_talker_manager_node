const fs = require('fs').promises;
const { join } = require('path');

const getAll = async () => fs.readFile(join(__dirname, '../talker.json'), 'utf-8');
const getById = async (id) => {
    const talkersString = await getAll();
    const talkers = await JSON.parse(talkersString);
    const talker = talkers.find((t) => t.id === Number(id));
    if (!talker) return null;
    return talker;
};
module.exports = {
    getAll,
    getById,
};
