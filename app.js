const express = require('express');
const path = require('path')

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const index = require('./routes/index');
const about = require('./routes/about');
const ressources = require('./routes/ressources');

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"))
app.use(express.static('public'))
app.use(index)
app.use(about)
app.use(ressources)
app.all('*', (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Process started on port", port);
});