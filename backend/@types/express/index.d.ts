interface iauth {
    id: string;
    first_name: string;
    roles: string[]
}

    declare namespace Express {
        interface Request {
            auth: iauth
        }
    }
