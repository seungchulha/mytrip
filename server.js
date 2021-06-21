const express = require('express');
const server = express();
const hbs = require('express-handlebars');
require('dotenv').config({path:'variables.env'});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));
const User = require('./models/User');
const formidable = require('formidable');

server.engine("hbs", hbs({
    extname: "hbs",
    defaultLayout: "layout.hbs",
    partialsDir: "partials",
    })
);

server.set("view engine", "hbs");
server.use(express.static(__dirname + "/public"));

server.get("/", (req, res) => {
    // const newUser = new User();
    // newUser.email = "alaxhenry@gmail.com";
    // newUser.name = "승철";
    // newUser.age = 32;
    // newUser.save()
    //     .then((user)=>{
    //         console.log(user);
    //         res.json({
    //             message: 'User created Successfully'
    //         })
    //     })
    //     .catch((err)=>{
    //         res.json({
    //             message: err.toString()
    //         })
    //     })
     res.render("home");
});

server.get("/signup", (req, res)=>{
    res.render("signup");
});

server.post("/signup", (req, res)=>{    
    const newUser = new User();
    newUser.email = req.body.User.email;
    newUser.password = req.body.User.password;
    newUser.name = req.body.User.name;
    newUser.age = req.body.User.age;
    newUser.save()
        .then((user)=>{
            console.log(user);
            res.json({
                message: 'User created Successfully'
            })
        })
        .catch((err)=>{
            res.json({
                message: err.toString()
            })
        })
});


server.get("/write", (req, res) => {
    res.render("BoardWrite");
});

server.get("/heart", (req, res) => {
    res.render("heart");
});

server.get("/detail", (req, res) => {
    res.render("BoardDetail");
});

server.get("/map", (req, res) => {
    res.render("map");
});

server.listen(8000, (err) => {
    if(err){
        return console.log(err);
    }else{
        mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
            if(err){
                console.error(err);
            }else{
                console.log('connected to database successfully');
            }
        });
    }
});