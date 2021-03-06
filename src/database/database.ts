import mongoose, { Connection } from "mongoose";
import { config } from "node-config-ts";
import { exit } from "process";

const mongooseConnection: Connection = mongoose.connection;

export const startDatabase = async () : Promise<void> => {

    process.on('SIGTERM', terminate)
    process.on('SIGINT', terminate);

    mongooseConnection
        .on('error', (error: Error) => console.error(`Mongo connection error: ${error}`))
        .on('close', () => console.log('Mongo connection closed'))
        .on('connected', () => console.log('Mongo connected'))
        .on('reconnected', () => console.log('Mongo reconnected'))
        .on('disconnected', () => {
            console.log('Mongo disconnected, trying to reestablish connection...');
            setTimeout(() => mongoConnect({socketTimeoutMS: 3000, connectTimeoutMS: 3000}), 3000);
        });

    await mongoConnect();
};

const mongoConnect = async (opt = {}) => {
    console.log(`Connectiong to mongo: ${config.mongoUri}`);
    await mongoose.connect(config.mongoUri, {...opt,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
};

const terminate = () => {
    Promise.all([
        mongooseConnection.close(() => console.log('Mongoose default connection is disconnected due to application termination')),
    ]).finally(() => exit(0)); 
};
