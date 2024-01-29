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


router.get("/users/edit/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/users/index"); 
    }

    User.findByPk(id).then(user => {
        if(user != undefined){
            res.render("users/edit",{user: user});
        }else{
            res.redirect("/users/index");
        }
    }).catch(erro => {
        res.redirect("/users/index");        
    })
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


router.post("/users/save-edit", (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;

    User.update({nome: nome, email: email },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/users/index");    
    })

});


router.post("/users/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/users/index");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/users/index");
        }
    }else{ // NULL
        res.redirect("/users/index");
    }
});

module.exports = router;