const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const PORT = 3005;

const usersController = require("./users/UsersController");
const User = require("./users/User");

// View engine
app.set('view engine','ejs');

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

//adicionar a regra de middleware
app.use("/",usersController);


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
        console.log("O servidor está rodando na porta:"+PORT)
    })