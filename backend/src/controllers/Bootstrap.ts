import {getCollection} from "../db";
import {config} from "../config";
import { User } from "../db/models/User";

export const BootstrapDB = async () => {
    // setup default event types
    const defaultEventTypes = ['MeetUp', 'Leap', 'Recruiting Mission', 'Hackathon', 'Premium-only Webinar', 'Open Webinar'];
    const eventTypes = defaultEventTypes.map(type => ({
        name: type,
        description: type
    }));

    const eventTypeCollection = await getCollection(config.collections.EVENT_TYPES_COLLECTION);
    const count = await eventTypeCollection.estimatedDocumentCount();
    if(count === 0){
        await eventTypeCollection.insertMany(eventTypes);
    }

    // setup admin user
    const userCollection = await getCollection(config.collections.USER_COLLECTION);
    const adminUser = await userCollection.findOne({roles: {$in: ['admin']}});
    if(!adminUser){ 
        const admin = new User(
            'Admin', 'User', 'admin@example.com', 'admin', ['admin']
        );
        await admin.save();
    }
}