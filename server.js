const express = require('express');
const server = express();
const hbs = require('express-handlebars');

server.engine("hbs", hbs({
    extname: "hbs",
    defaultLayout: "layout.hbs",
    partialsDir: "partials",
    })
);

server.set("view engine", "hbs");
server.use(express.static(__dirname + "/public"));

server.get("/", (req, res) => {
    res.render("home");
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
    if (err) return console.log(err);
    console.log("The server is listening on port 8000");
});