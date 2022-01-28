import { exit } from "process";
import { mongooseConnection, startDatabase } from "../src/database";
import { readFile } from "fs/promises";
import { join } from "path";
import { AcronymMongoModel } from "../src/acronyms/acronym-mongo.model";

const importData = async () : Promise<void> => {
    await startDatabase();

    const filePath = join(__dirname, "./acronym.json");
    console.log(`Reading from file: ${filePath}`);
    const contents = await readFile(filePath, "utf-8");
    const dataToImprt = JSON.parse(contents);

    for(const item of dataToImprt ) {
        for(const key in item) {
            console.log( `${key} : ${item[key]}`);
            if(!(await AcronymMongoModel.findOne({acronym: key}))) {
                await new AcronymMongoModel({
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
