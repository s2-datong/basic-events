import { Event } from "../db/models/Event";
import { EventApplication } from "../db/models/EventApplication";

export const CreateEvent = async (name: string, description: string, event_types: string[], date: Date, venue: string) => {
    const event = new Event(name, description, event_types, date, venue, null);
    await event.save();

    return {
        message: 'Event created',
        id: String(event.id)
    };
}

export const ListEvents = async (page: number, limit: number, search: string | null = null) => {
    const events = await Event.list(page, limit, search)
    return events;
}

export const UpdateEvent = async (id: string, name: string, description: string, event_types: string[], date: Date, venue: string) => {
    const event = new Event(name, description, event_types, date, venue, id);
    await event.update();

    return {
        message: 'Event Updated'
    };
}

export const DeleteEvent = async (id: string) => {
    await Event.delete(id);
    return {
        message: 'Event Deleted'
    };
}

export const GetSingleEvent = async (id: string) => {
    const event = await Event.find(id);
    return event;
}

export const ApplyToEvent = async (id: string, first_name: string, last_name: string, email: string) => {
    if(EventApplication.HasUserApplied(email, id)){
        throw new Error("You have already applied to this event");
    }

    const application = new EventApplication(id, first_name, last_name, email);
    await application.save();

    return {message: 'Application Successful'};
}