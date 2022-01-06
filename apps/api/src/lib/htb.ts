import { request } from 'gaxios';
import HTBTokenResponse from '../models/HTBTokenResponse.model';

const routes = {
    activeMachines: "https://www.hackthebox.eu/api/v4/machine/list",
    retiredMachines: "https://www.hackthebox.eu/api/v4/machine/list/retired",
    login: "https://www.hackthebox.eu/api/v4/login/",
}

export const getActiveMachines = async () => {
    try {
        const accessToken = await getV4AccessToken();
        if (!accessToken) {
            throw new Error("Could not get authenticated");
        }
        console.log(accessToken);
        const activeMachines = await request({
            method: "GET",
            url: routes.activeMachines,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return activeMachines.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getV4AccessToken = async () => {
    try {
        console.log(process.env.HTB_EMAIL, process.env.HTB_PASSWORD);
        const response = await request({
            method: "POST",
            url: routes.login,
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: {
                email: process.env.HTB_EMAIL,
                password: process.env.HTB_PASSWORD,
                remember: true
            }
        });
        const accessToken = (response.data as HTBTokenResponse).message.access_token;
        `Acquired API v4 Session (Valid until ${new Date(parseJwt(accessToken).exp * 1000).toLocaleString()})`
        return accessToken;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            console.error(err.response.data.message)
        } else {
            console.error(err);
        }
    }
}

export const parseJwt = (token: string) => {
    if (token) {
        try {
            const base64Url = token.split(".")[1]
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
            const buff = Buffer.from(base64, "base64")
            const payloadinit = buff.toString("ascii")
            const payload = JSON.parse(payloadinit)
            return payload
        } catch (e) {
            console.error(e)
            return null
        }
    } else {
        return null
    }
}