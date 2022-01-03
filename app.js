const express = require('express');
const path = require('path')

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const index = require('./routes/index');

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"))
app.use(express.static('public'))
app.use(index)

app.listen(port, () => {
    console.log("Process started on port", port);
});