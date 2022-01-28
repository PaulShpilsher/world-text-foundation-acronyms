import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { acronymRouter } from "./acronyms/acronym.router";

export const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json()) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/acronym", acronymRouter);
