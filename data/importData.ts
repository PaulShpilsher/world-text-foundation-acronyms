

import { exit } from "process";
import { mongooseConnection, startDatabase } from "../src/database";
import { AcronymModel } from "../src/acronyms/acronym.model";
import data from "./acronym.json";

const importData = async () : Promise<void> => {
    await startDatabase();

    for(const item of data ) {
        for(const key in item) {
            console.log( `${key} : ${item[key]}`);

            if(!(await AcronymModel.findOne({acronym: key}))) {
                await new AcronymModel({
                    acronym: key,
                    definition: item[key]                
                }).save();
            }
        }
    }
};

Promise.all([importData()]).finally(() => {
    mongooseConnection.close(() => {
        console.log('Mongoose default connection is disconnected');
        exit(0);
    });
});
