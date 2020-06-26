var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.set("views",__dirname+'/views');
app.set('view engine','ejs');
var bp = bodyParser.urlencoded({extended:false});
var utilisateurs = [];
app.get("/utilisateurs", function (req,res) {
    res.render("utilisateurs.ejs", {utilisateurs:utilisateurs});
});
app.get("/utilisateur/nouveau",function (req,res) {
   res.render("nouveau.ejs");
});
app.post("/utilisateur/ajout",bp,function (req,res) {
   var id = req.body.id;
   var login = req.body.login;
   var pwd = req.body.pwd;
   var utilisateur = {id:id, login:login, pwd:pwd};
   utilisateurs.push(utilisateur);
   res.redirect("/utilisateurs");
});
app.post("/utilisateur/mod",bp,function (req, res) {
    var id = req.body.id;
    var login = req.body.login;
    var pwd = req.body.pwd;
    utilisateurs.forEach(function (utilisateur) {
        if(utilisateur.id == id){
            utilisateur.login = login;
            utilisateur.pwd = pwd;
        }
    });
    res.redirect("/utilisateurs");
});
app.post("/utilisateur/supp",bp,function(req,res){
   var id = req.body.id;
   utilisateurs = utilisateurs.filter(function (utilisateur) {
       return (utilisateur.id != id);
   });
   res.redirect("/utilisateurs");
});

// default routing
app.get("*", function (req, res){
    res.send("Erreur 404: URL "+req.url+" inconnue <a href='/utilisateurs'>you can go there >>></a>");
});

app.listen(3000);
console.log("serveur laance sue le port 3000");