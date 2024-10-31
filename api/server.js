const express = require("express");
const cors = require("cors");
require('dotenv').config();
const ejs = require('ejs');
const search = require('./controllers/search');
const translate = require('./controllers/transtale');
const edition = require('./controllers/edition');
const recommen = require('./controllers/recommen');

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
    const result = await search.search('subject', 'New York Times reviewed', '', '', '', 1);
    
    const lang = 0;
    if (lang == 1) {

        for (let i in result) {
            result[i].title = await translate.translate(result[i].title);
            result[i].description = await translate.translate(result[i].description);

            for (let j in result[i].subject) {
                result[i].subject[j] = await translate.translate(result[i].subject[j]);
            };
        };
    };

    for (let i in result) {
        let resultEdition = await edition.edition(result[i].isbn);
        result[i].edition = resultEdition;
    };
    
    // console.log(result[i]);
    for (let i in result) {
        let resultRecommen = await recommen.recommen(result[i].title, result[i].subject, result[i].author);
        result[i].recommen = resultRecommen;
        console.log(result[i]);
    };
}
router.get("/", getHomeBook);