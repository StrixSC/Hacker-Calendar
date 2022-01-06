import { Contest } from './models/CListContestResponse.model';
import express, { Request, Response, NextFunction } from 'express';
import create, { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
import index from "./routes/index";
import update from "./routes/update";

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use('/', index);
app.use('/update', update);
app.all('*', (req, res) => {
    res.redirect("/");
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpError) {
        res.status(error.status).json(error);
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            create(new create.InternalServerError())
        );
    }
});

app.listen(port, () => {
    console.log("Process started on port", port);
});
