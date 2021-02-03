import {Db, MongoClient} from "mongodb";
import {config} from "../config";

let client: MongoClient | null = null;
let db : Db | null = null;

export const setupDB = async () => {
    try{
        const mongourl = `mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
        client = new MongoClient(mongourl, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        db = client.db(config.mongodb.database);
    }
    catch(e){
        console.error(e);
    }
}

export const getCollection = async (name: string) => {
    if(client == null || db == null){
        await setupDB();
    }

    if(db == null) throw new Error("Connection error");

    const collection = db.collection(name);
    return collection;
}

export const closeDB = async () => {
    if(client !== null){
        await client.close(true);
        client = null;
    }
}