const fs = require('fs').promises;
const { join } = require('path');

const getAll = async () => fs.readFile(join(__dirname, '../talker.json'), 'utf-8');
module.exports = {
    getAll,
};
