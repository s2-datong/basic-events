import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).write("Unauthorized");
        res.end();
        return;
    }

    let token;
    if(authHeader.indexOf(" ") !== -1) token = authHeader.split(" ")[1];
    else token = authHeader;

    try{
        const payload: any = verify(token, config.jwt_secret);
        req.auth = {
            id: payload.id,
            first_name: payload.first_name,
            roles: payload.roles
        };
        next();
    }
    catch(e){
        res.status(401).write("Unauthorized");
        res.end();
        return;
    }
}