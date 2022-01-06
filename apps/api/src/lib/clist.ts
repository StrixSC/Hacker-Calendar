import { HackerSource } from './../models/HackerEvent.model';
import { Auth, authenticateWithCallback, calendar } from './calendar';
import { CListContestsResponse, Contest } from './../models/CListContestResponse.model';
import { CListContestParams } from './../models/CListContestParams.model';
import { request } from "gaxios";
import generateRandomColorId from './colors';
import { HackerEvent } from '../models/HackerEvent.model';

const routes = {
    baseUrl: "https://clist.by:443",
    contests: "/api/v2/contest/"
}

export const getContests = async (params?: CListContestParams): Promise<CListContestsResponse | null> => {
    try {
        let queryParams = "?"
        if (params) {
            const keys = Object.keys(params);
            keys.forEach((key) => {
                queryParams += `${key}=${params[key]}&`
            });
        }

        queryParams = queryParams.slice(0, queryParams.length - 1);

        const res = await request<CListContestsResponse>({
            method: "GET",
            url: routes.baseUrl + routes.contests + queryParams,
            headers: {
                "Authorization": "ApiKey " + process.env.CLIST_API_KEY
            }
        });

        return res.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const getContestsBetween = async (start: Date, end: Date): Promise<CListContestsResponse | null> => {
    return getContests({
        start__gte: start.toISOString(),
        end__lte: end.toISOString()
    });
}

export const getContestsStarting = async (start: Date): Promise<CListContestsResponse | null> => {
    return getContests({
        start__gte: start.toISOString()
    });
}

export const getClistContests: HackerSource = async (start: Date): Promise<HackerEvent[]> => {
    const data = await getContestsStarting(start);
    if (data) {
        return data.objects.map((contest: Contest) => ({
            start: contest.start,
            end: contest.end,
            summary: contest.event,
            id: contest.id.toString(),
            description: contest.href
        })) as HackerEvent[]
    } else return [];
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
                        colorId: generateRandomColorId(),
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