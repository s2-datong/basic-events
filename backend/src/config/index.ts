import { Iconfig } from "./config";

class Config implements Iconfig{
    port = Number(process.env.PORT);
    mongodb = {
        host: process.env.DB_HOST || '',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3000,
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE_NAME || ''
    };

    collections = {
        EVENT_COLLECTION: "events",
        USER_COLLECTION: "users",
        EVENT_TYPES_COLLECTION: "event_types",
        EVENT_APPLICATION_COLLECTION: "event_applications"
    };

    jwt_secret = process.env.JWT_SECRET || 'secret';
    jwt_expires = process.env.JWTEXPIRES || '7d';
}

export const config = new Config();