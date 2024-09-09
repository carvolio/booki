const express = require("express");
const cors = require("cors");
require('dotenv').config();
const ejs = require('ejs');

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

const teste = (req, res) => {
    res.json("API gerenciador de tarefas respondendo!");
};
router.get("/", teste);