import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { asyncApiHandler } from "../utils";

// for now just test for presence of na authorization header
export const checkAuth = asyncApiHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    else {
        next();
    }
});
