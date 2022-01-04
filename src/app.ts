import express from 'express';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
import index from "./routes/index";
import about from './routes/about';
import ressources from './routes/ressources';

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