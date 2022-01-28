import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware";
import { asyncApiHandler } from "../utils";
import { AcronymController } from "./acronym.controller";


export const acronymRouter = Router()
    .get("/", asyncApiHandler(AcronymController.getAcronyms))
    .get("/:acronym", asyncApiHandler(AcronymController.getAcronym))
    .post("/", asyncApiHandler(AcronymController.createAcronym))
    .put("/:acronym", checkAuth, asyncApiHandler(AcronymController.updateAcronym))
    .delete("/:acronym", checkAuth, asyncApiHandler(AcronymController.deleteAcronym))

