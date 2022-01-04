import { CListContestsResponse } from './../models/CListContestResponse.model';
import { CListContestParams } from './../models/CListContestParams.model';
import { request } from "gaxios";
import fs from "fs";

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