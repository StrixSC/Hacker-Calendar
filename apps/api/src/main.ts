import { Contest } from './models/CListContestResponse.model';
import express from 'express';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
import index from "./routes/index";
import { authenticateWithCallback } from "./lib/calendar";
import { getContestsStarting } from "./lib/clist";
import { Auth, calendar } from "./lib/calendar";

const port = process.env.PORT || 3000
const colorIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

app.use(express.urlencoded({ extended: true }));

app.use(index);

app.all('*', (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Process started on port", port);
});

const getRandomColorId = (): string => {
    return colorIds[Math.floor(Math.random() * colorIds.length)].toString();
}

const updateCalendar = (): any => {
    authenticateWithCallback(async (auth: Auth, calendarId: string) => {
        const data = await getContestsStarting(new Date());
        data.objects.forEach(async (contest: Contest) => {
            try {
                await calendar.events.insert({
                    auth,
                    calendarId,
                    requestBody: {
                        colorId: getRandomColorId(),
                        start: {
                            dateTime: contest.start,
                            timeZone: "UTC"
                        },
                        end: {
                            dateTime: contest.end,
                            timeZone: "UTC"
                        },
                        summary: contest.event,
                        description: contest.href,
                        id: contest.id.toString(),
                    }
                })
            } catch (e) {
                console.error("Duplicate on ", contest.event);
            }
        });
    });
}