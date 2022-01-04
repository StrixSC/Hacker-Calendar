import { google } from "googleapis"
import { BaseExternalAccountClient, Compute, GoogleAuth, Impersonated, JWT, UserRefreshClient } from "google-auth-library";

const calendarId = process.env.CALENDAR_ID || "4ik1bjvl5hd994nuv58ok85snc@group.calendar.google.com";
export const calendar = google.calendar('v3');
import * as seviceaccount from "../../config.json";

export type Auth = Compute | JWT | UserRefreshClient | Impersonated | BaseExternalAccountClient;

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

export const authenticateWithCallback = async (callback: (auth: Auth, calendarId: string) => any) => {
    const auth = new GoogleAuth({
        scopes: SCOPES,
        credentials: seviceaccount
    });

    try {
        const authClient = await auth.getClient();
        const project = await auth.getProjectId();
        console.log("Authencation complete. Logged into project:", project);
        callback(authClient, calendarId)
    } catch (e) {
        console.error(e);
    }
}