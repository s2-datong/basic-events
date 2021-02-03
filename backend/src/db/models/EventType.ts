import { ObjectId } from "mongodb";
import { getCollection } from "..";
import { config } from "../../config";

export class EventType{
    id?: ObjectId;
    name: string;
    description: string;

    constructor(name: string, description: string, id: string | null){
        this.name = name;
        this.description = description;
        if(id !== null) this.id = new ObjectId(id);
    }

    async save(){
        const collection = await getCollection(config.collections.EVENT_TYPES_COLLECTION);
        const result = await collection.insertOne({
            name: this.name,
            description: this.description
        });
        this.id = result.insertedId;
    }

    async update(){
        if(this.id){
            const collection = await getCollection(config.collections.EVENT_TYPES_COLLECTION);
            await collection.updateOne({id: this.id}, {
                name: this.name,
                description: this.description
            })
        }
        else throw new Error("Cannot update event type without id");
    }

    static async list(){
        const collection = await getCollection(config.collections.EVENT_TYPES_COLLECTION);
        const result = await collection.find().sort({_id: -1}).toArray();
        const event_types = result.map( (event_type: EventType) => ({
            id: String(event_type.id),
            name: event_type.name,
            description: event_type.description
        }))

        return event_types;
    }

    static async delete(id: string){
        const collection = await getCollection(config.collections.EVENT_TYPES_COLLECTION);
        await collection.deleteOne({_id: new ObjectId(id)});
    }
}