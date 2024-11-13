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
app.set('view engine', 'ejs');
app.use(express.static('public'));

const router = express.Router();
app.use(router);

app.listen(porta, () => {
    console.log(`[server] respondendo na porta ${porta}`);
});

const getHomeBook = async (req, res) => {
    const subjectsArry = ["fiction", "fantasy", "young adult", "thriller", "sience fiction", "romance", "horror"];
    const subjects = subjectsArry[Math.floor(Math.random() * subjectsArry.length)];
    const result = await search.search('subject', subjects, '', '', '', 9);
    
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
        let dots = result[i].description.split('.');
        result[i].description = dots.slice(0, 2).join('.');
        const caracter = result[i].description.length > 195 ? result[i].description.slice(0, 195) + '...' : result[i].description;  
        result[i].description = caracter;

    };

    // for (let i in result) {
    //     let resultEdition = await edition.edition(result[i].isbn);
    //     result[i].edition = resultEdition;
    // };
    
    // for (let i in result) {
    //     let resultRecommen = await recommen.recommen(result[i].title, result[i].subject, result[i].author);
    //     result[i].recommen = resultRecommen;
    // };

    return result;
}

const getHome = async (req, res) => {
    const books = await getHomeBook();
    res.render('home', { books: books });
};
router.get("/", getHome);