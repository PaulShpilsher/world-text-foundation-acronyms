/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const sendErrorMessage = (res: Response, status: number, message: string) => res.status(status).send(message);

export const asyncApiHandler = (fn: (req: Request, res: Response, next: NextFunction) => any) => (req: Request, res: Response, next: NextFunction) =>
    Promise
        .resolve(fn(req, res, next))
        .catch((err: any) => {
            if(err instanceof Error) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
            }
            else {
                next(err);
            }
        });
