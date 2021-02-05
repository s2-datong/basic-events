import { EventType } from "../db/models/EventType";

export const CreateEventType = async (name: string, description: string) => {
    const eventType = new EventType(name, description, null);
    await eventType.save();

    return {message: "EventType created", id: String(eventType.id)};
}

export const ListEventTypes = async () => {
    const eventTypes = await EventType.list();
    return eventTypes;
}

export const DeleteEventType = async (id: string) => {
    await EventType.delete(id);
    return {message: 'EventType deleted'}
}

export const UpdateEventType = async (id: string, name: string, description: string) => {
    const eventType = new EventType(name, description, id);
    await eventType.update();

    return {message: "EventType updated"};
}