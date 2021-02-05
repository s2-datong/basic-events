import { NextFunction, Request, Response } from "express";
export const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { auth } = req;
    const { roles } = auth;

    if(!roles.includes('admin')){
        res.status(401).write("Unauthorized");
        res.end();
        return;
    }

    next();
}