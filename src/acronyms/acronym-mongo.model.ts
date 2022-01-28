import { Document, Schema, Model, model } from "mongoose";
import { AcronymModel } from "./acronym.model";
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching';

const acronymSchema = new Schema({
    acronym: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxlength: 32,
        uppercase: true,
        trim: true
    },
    definition: {
        type: String,
        required: true,
        minLength: 2,
        maxlength: 256,
        trim: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});

acronymSchema.plugin(mongoose_fuzzy_searching, { fields: ["definition"] });

export interface AcronymDocument extends AcronymModel, Document {}

export const AcronymMongoModel: Model<AcronymDocument> = model<AcronymDocument>("Acronym", acronymSchema);


export const toAcronymModel = (model: AcronymDocument) : AcronymModel => ({
    acronym: model.acronym,
    definition: model.definition
});
