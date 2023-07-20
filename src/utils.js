const { getAll } = require('./fs_scripts/getters_fs');

const returnAllAsJSON = async () => {
    const selection = await getAll();
    return JSON.parse(selection);
};

module.exports = {
    returnAllAsJSON,
};