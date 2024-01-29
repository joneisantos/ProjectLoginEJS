const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');


router.get("/users/index", (req, res) => {
    User.findAll().then(users => {
        res.render("users/index",{users: users});
    });
});

router.get("/users/create",(req, res) => {
    res.render("users/create");
});

router.post("/users/save-create", (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            
            User.create({
                nome: nome,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/users/index");
            }).catch((err) => {
                res.redirect("/");
            });

        }else{
            res.redirect("/users/create");
        }
    });
});

module.exports = router;