import { Request, Response } from "express";
import httpStatus from "http-status";
import { isNumeric } from "../utils";
import { AcronymModel, AcronymUpdateModel } from "./acronym.model";
import { AcronymService } from "./acronym.service";


export abstract class AcronymController {

    static async getAcronyms(req: Request, res: Response) {
        const { from, limit, search } = req.query as { from: string, limit: string, search: string };
        
        // validation
        const validationErrorMessages : string[] = [];

        // from: required non-negative number
        if(!from || !isNumeric(from) || (from[0] ==="-")) {
            validationErrorMessages.push("Invalid or missing [from] query parameter");
        }
        // limit: required non-negative number
        if(!limit || !isNumeric(limit) || (limit[0] === "-")) {
            validationErrorMessages.push("Invalid or missing [limit] query parameter");
        }
        // search: requred
        if(!search) {
            validationErrorMessages.push("Missing [search] query parameter");
        }
        if(validationErrorMessages.length) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: validationErrorMessages
            });
        }

        const skipRecords = parseInt(from, 10);
        const limitRecords = parseInt(limit, 10);
         
        // getting one more extra record to determine if there are more data available
        // but we will not return that record to the cient
        const models: AcronymModel[] = await AcronymService.readAcronyms(skipRecords, limitRecords+1, search);
        if(models.length > limitRecords) {
            models.pop(); // remove extra record
            const nextUrl = req.url.replace(/from=\d+/, `from=${skipRecords+limitRecords}`);
            res.header("next", nextUrl);
        }

        return res.status(httpStatus.OK).json(models);
    }

    static async getAcronym(req: Request, res: Response) {
        const { acronym } = req.params as { acronym: string };
        if(!acronym) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        const model: AcronymModel | null  = await AcronymService.readAcronym(acronym);
        if(!model) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        else {
            return res.status(httpStatus.OK).json(model);
        }
    }

    static async createAcronym(req: Request, res: Response) {
        const model: AcronymModel = req.body as AcronymModel;
        if(!model.acronym || !model.definition) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        const created: boolean = await AcronymService.create(model);
        if(created) {
            return res.sendStatus(httpStatus.CREATED);
        }
        else {
            return res.sendStatus(httpStatus.CONFLICT);
        }
    }

    static async updateAcronym(req: Request, res: Response) {
        const { acronym } = req.params as {acronym: string};
        const updateModel = req.body as AcronymUpdateModel;
        if(!acronym || !updateModel.definition) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        const model: AcronymModel | null  = await AcronymService.update(acronym, updateModel);
        if(!model) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        else {
            return res.sendStatus(httpStatus.OK);
        }
    }
}
