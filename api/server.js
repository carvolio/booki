const express = require("express");
const cors = require("cors");
require('dotenv').config();
const ejs = require('ejs');
const search = require('./controllers/search');
const translate = require('./controllers/transtale');

const app = express();
app.use(express.json());
app.use(cors());

const porta = process.env.PORT || 3000;
//app.set('view engine', 'ejs');
//app.use(express.static('public'));

const router = express.Router();
app.use(router);

app.listen(porta, () => {
    console.log(`[server] respondendo na porta ${porta}`);
});

const getHomeBook = async (req, res) => {
    const nameBook = "dune";
    const result = await search.search('q', nameBook, '', '', '', 2);
    console.log(result[1]);
    const lang = 1;

    if (lang == 1) {

        for (let i in result) {
            result[i].title = await translate.translate(result[i].title);
            result[i].description = await translate.translate(result[i].description);

            for (let j in result[i].subject) {
                result[i].subject[j] = await translate.translate(result[i].subject[j]);
            };
        };
        console.log(result[1]);
    };
}
router.get("/", getHomeBook);