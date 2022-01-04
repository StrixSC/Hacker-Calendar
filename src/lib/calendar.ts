import { google } from "googleapis"
import { BaseExternalAccountClient, Compute, GoogleAuth, Impersonated, JWT, UserRefreshClient } from "google-auth-library";

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
        const project = await auth.getProjectId();
        console.log("Authencation complete. Logged into project:", project);
        callback(authClient, calendarId)
    } catch (e) {
        console.error(e);
    }
}
