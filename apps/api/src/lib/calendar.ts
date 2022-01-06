import { HackerEvent } from './../models/HackerEvent.model';
import { calendar_v3, google } from "googleapis"
import fs from "fs";
import { BaseExternalAccountClient, Compute, GoogleAuth, Impersonated, JWT, UserRefreshClient } from "google-auth-library";
import generateRandomColorId from './colors';

const calendarId = process.env.CALENDAR_ID;
export const calendar = google.calendar('v3');

export type Auth = Compute | JWT | UserRefreshClient | Impersonated | BaseExternalAccountClient;

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

export const authenticateWithCallback = async (callback: (auth: Auth, calendarId: string) => any) => {
    const auth = new GoogleAuth({
        scopes: SCOPES,
        credentials: JSON.parse(
            Buffer.from(
                process.env.GAPI_CERT,
                'base64'
            ).toString('ascii')
        )
    });

    try {
        const authClient = await auth.getClient();
        callback(authClient, calendarId)
    } catch (e) {
        console.error(e);
    }
}

export const updateCalendar = async (auth: Auth, calendarId: string, data: HackerEvent[]) => {
    const updatedSources = await removeDuplicates(auth, calendarId, data);
    const skipped = Math.abs(data.length - updatedSources.length);
    const errored = [];
    for (let event of updatedSources) {
        try {
            await calendar.events.insert({
                auth,
                calendarId,
                requestBody: {
                    colorId: generateRandomColorId(),
                    start: {
                        dateTime: event.start,
                        timeZone: "UTC"
                    },
                    end: {
                        dateTime: event.end,
                        timeZone: "UTC"
                    },
                    summary: event.summary,
                    description: event.description,
                    id: event.id.toString(),
                }
            })
        } catch (e) {
            errored.push({ event: event.summary, id: event.id });
        }
    }
    return [skipped, errored];
}

export const removeDuplicates = async (auth: Auth, calendarId: string, data: HackerEvent[]) => {
    const upcomingPlannedEvents = await getPlannedUpcomingEvents(auth, calendarId);
    const updatedEventList = [] as HackerEvent[];

    for (let contest of data) {
        const conflictingIncomingEvent = upcomingPlannedEvents.find((event) => event.id === contest.id);
        if (!conflictingIncomingEvent) {
            updatedEventList.push(contest);
        }
    }

    return updatedEventList;
}

export const getPlannedUpcomingEvents = async (auth: Auth, calendarId: string): Promise<calendar_v3.Schema$Event[]> => {
    try {
        const results = await calendar.events.list({
            auth,
            calendarId,
            maxResults: 2500,
            timeMin: new Date().toISOString(),
            timeZone: "UTC"
        });

        return results.data.items;
    } catch (e) {
        return [];
    }
}