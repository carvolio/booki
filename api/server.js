const express = require("express");
const cors = require("cors");
require('dotenv').config();
const ejs = require('ejs');
const search = require('./controllers/search');

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
    const book = "dune";
    const result = await search.search('q', book, '', '', '', 10);
    console.log(result);
}
router.get("/", getHomeBook);