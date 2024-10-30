
const deepl = require('deepl-node');
require('dotenv').config();
const authKey = process.env.API_KEY;

const translator = new deepl.Translator(authKey);

const translate = async (data) => {
    const result = await translator.translateText(data, null, 'pt-BR', { formality: 'less' })
    return result.text;
};

module.exports = { translate };