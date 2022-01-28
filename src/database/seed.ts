
import { readFile } from "fs/promises";
import { join } from "path";
import { config } from "node-config-ts";
import { AcronymMongoModel } from "../acronyms/acronym-mongo.model";
import { AcronymModel } from "src/acronyms/acronym.model";

const dataExists =async () : Promise<boolean> => {
    const data = await AcronymMongoModel.findOne().lean();
    return data != null;
};

export const seedDatabase = async () => {
    if(await dataExists()) {
        return;
    }

    const filePath = join(__dirname, "../..", config.seedFile);
    console.log(`Seeding database from file: ${filePath}`);

    const contents = await readFile(filePath, "utf-8");
    const dataToImprt = JSON.parse(contents);

    // the acronyms must be unique
    // ignoring duplicates
    const acronyms = new Set<string>();
    for(const item of dataToImprt ) {
        for(const key in item) {
            // console.log( `${key} : ${item[key]}`);
            if(!acronyms.has(key)) {
                acronyms.add(key);      
                const model: AcronymModel = {
                    acronym: key,
                    definition: item[key]                
                };

                await new AcronymMongoModel(model).save();
            }
        }
    }

    console.log(`Imported ${acronyms.size} abbreviations`);
};
