function validAuth(req, res, next){
    if(req.session.user != undefined){

        res.locals.user = req.session.user || null;

        next();
    }else{
        res.redirect("/");
    }
 }
 
 module.exports = validAuth