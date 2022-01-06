import { Request, Response, NextFunction } from "express";
import create from "http-errors";

export default function authentifyRequest(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['x-hc-auth'];
    if (token && token === process.env.HC_AUTH_KEY) {
        return next();
    } else {
        return next(new create.Unauthorized("Missing request token"));
    }
}