interface MongoConfig{
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

interface ICollections {
    EVENT_COLLECTION: string;
    USER_COLLECTION: string;
    EVENT_TYPES_COLLECTION: string;
}

export interface Iconfig {
    mongodb: MongoConfig;
    port: number;
    collections: ICollections;
    jwt_secret: string;
    jwt_expires: string;
}