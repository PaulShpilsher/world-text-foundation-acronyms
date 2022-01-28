import { AcronymModel, AcronymUpdateModel } from "./acronym.model";
import { AcronymDocument, AcronymMongoModel, toAcronymModel } from "./acronym-mongo..model";

export abstract class AcronymService {

    static async create(model: AcronymModel): Promise<boolean> {
        try {
            const document: AcronymDocument = await new AcronymMongoModel({...model}).save();
            return !!document;
        }
        catch(err) {
            // is it a duplicate error
            if((err?.name === "MongoError") && (err?.code === 11000)) {
                return false; 
            }
            throw err;
        }
    }

    static async update(acronym: string, model: AcronymUpdateModel): Promise<AcronymModel | null> {
        const conditions = {
            acronym
        };
        const update = {
            definition: model.definition
        };
        const document: AcronymDocument = await AcronymMongoModel.findOneAndUpdate(conditions, update).lean();
        return !document ? null : toAcronymModel(document);
    }

    static async readAcronyms(skip: number,limit: number, search: string) : Promise<AcronymModel[]> {            
        const documents  = await AcronymMongoModel.fuzzySearch(search)
            .skip(skip)
            .limit(limit)
            .lean();

        const acronyms = documents.map(toAcronymModel);
        return acronyms;
    }

    static async readAcronym(acronym: string) : Promise<AcronymModel | null> {
        const conditions = {
            acronym
        }; 
        const document  = await AcronymMongoModel.findOne(conditions).lean();
        return !document ? null : toAcronymModel(document);
    }

    static async deleteAcronym(acronym: string) : Promise<boolean> {
        const conditions = {
            acronym
        }; 
        const res  = await AcronymMongoModel.deleteOne(conditions);
        return res?.ok === 1 && res?.deletedCount === 1;
    }


}
