import { Event } from "../db/models/Event";

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