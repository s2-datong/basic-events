import { ObjectId } from "mongodb";
import { getCollection } from "..";
import { config } from "../../config";

export class Event{
    id?: ObjectId;
    name: string;
    description: string;
    event_types: string[];
    date: Date;
    venue: string;

    constructor(name: string, description: string, event_types: string[], date: Date, venue: string, id: string | null){
        this.name = name;
        this.description = description;
        this.event_types = event_types;
        this.date = date;
        this.venue = venue;

        if(id !== null) this.id = new ObjectId(id);
    }

    validateSelf(){
        if(this.event_types.length === 0) throw new Error("Event must have at least 1 event type");
        const now = new Date();
        if(this.date < now) throw new Error("Event must be in the future");
    }

    async save(){
        const collection = await getCollection(config.collections.EVENT_COLLECTION);
        const result = await collection.insertOne({
            name: this.name,
            description: this.description,
            event_types: this.event_types,
            date: this.date,
            venue: this.venue
        });
        this.id = result.insertedId;
    }

    async update(){
        const collection = await getCollection(config.collections.EVENT_COLLECTION);
        if(this.id){
            await collection.updateOne({_id: this.id}, {
                name: this.name,
                description: this.description,
                event_types: this.event_types,
                date: this.date,
                venue: this.venue
            });
        }
        else throw new Error("Cannot update event without id");
    }

    static async list(page = 1, limit = 20, search: string | null = null){
        const collection = await getCollection(config.collections.EVENT_COLLECTION);
        const skip = (page - 1) * limit;
        let where = {};
        if(search !== null) where = {$or: [
            {name: {$regex: search, $otions: 'i'}},
            {description: {$regex: search, $otions: 'i'}}
        ]};
        const result = await collection.find(where).sort({_id: -1}).skip(skip).limit(limit).toArray();
        const events = result.map((event: Event) => ({
            id: String(event.id),
            name: event.name,
            description: event.description,
            date: event.date,
            venue: event.venue,
            event_types: event.event_types
        }));

        return events;
    }

    static async delete(id: string){
        const collection = await getCollection(config.collections.EVENT_COLLECTION);
        await collection.deleteOne({_id: new ObjectId(id)});
    }

    static async find(id: string): Promise<Event> {
        const collection = await getCollection(config.collections.EVENT_COLLECTION);
        const event = await collection.findOne({_id: new ObjectId(id)});

        if(!event) throw new Error("event not found");
        return new Event(event.name, event.description, event.event_types, event.date, event.venue, id);
    }
}