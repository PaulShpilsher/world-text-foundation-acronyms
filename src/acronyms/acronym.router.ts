import { Router } from "express";
import { asyncApiHandler } from "../utils";
import { AcronymController } from "./acronym.controller";


export const acronymRouter = Router()
    .get("/", asyncApiHandler(AcronymController.getAcronyms))
    .get("/:acronym", asyncApiHandler(AcronymController.getAcronym))
    .post("/", asyncApiHandler(AcronymController.createAcronym))
    .put("/:acronym", asyncApiHandler(AcronymController.updateAcronym))

