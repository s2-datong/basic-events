import {getCollection} from "../db";
import {config} from "../config";

export const CreateEvent = async (name: string, description: string, event_types: string[], date: Date, venue: string) => {
    //
}

export const ListEvents = async (page: number, limit: number, search: string | null = null) => {
    //
}

export const UpdateEvent = async (id: string, name: string, description: string, event_types: string[], date: Date, venue: string) => {
    //
}

export const DeleteEvent = async (id: string) => {
    //
}

export const GetSingleEvent = async (id: string) => {
    //
}