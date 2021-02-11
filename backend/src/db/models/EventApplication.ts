import { ObjectId } from "mongodb";
import { getCollection } from "..";
import { config } from "../../config";

export class EventApplication{
    event_id: string;
    first_name: string;
    last_name: string;
    email: string;

    constructor(event_id: string, first_name: string, last_name: string, email: string){
        this.event_id = event_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email.toLowerCase();
    }

    async save(){
        const collection = await getCollection(config.collections.EVENT_APPLICATION_COLLECTION);
        const result = await collection.insertOne(this);
    }

    static async delete(email: string){
        const collection = await getCollection(config.collections.EVENT_APPLICATION_COLLECTION);
        await collection.deleteOne({email: email.toLowerCase()});
    }

    static async HasUserApplied(email: string, event_id: string){
        const collection = await getCollection(config.collections.EVENT_APPLICATION_COLLECTION);
        const apply = await collection.findOne({email: email.toLowerCase(), event_id})
        if(apply) return true;
        return false;
    }
}