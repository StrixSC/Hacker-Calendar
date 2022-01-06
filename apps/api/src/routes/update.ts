import { HackerEvent } from './../models/HackerEvent.model';
import { authenticateWithCallback, updateCalendar } from './../lib/calendar';
import express, { Request, Response, NextFunction } from "express";
import authentifyRequest from "../lib/authentify-request";
import { getClistContests } from "../lib/clist";
import { HackerSource } from "../models/HackerEvent.model";

const router = express.Router();

const sources: HackerSource[] = [getClistContests]

router.get("/", authentifyRequest, async (req: Request, res: Response, next: NextFunction) => {
    await authenticateWithCallback(async (auth, calendarId) => {
        const today = new Date();
        let allSources = [] as HackerEvent[];

        for (let source of sources) {
            const tmp = await source(today);
            allSources = allSources.concat(tmp);
        }
        const [skipped, errored] = await updateCalendar(auth, calendarId, allSources);
        return res.status(200).json({ message: "Update Successfull", errored, skipped })
    })
});

export default router;
