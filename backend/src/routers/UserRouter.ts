import {Router, Request, Response} from "express";
import { Login, Register } from "../controllers/User";

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const body = req.body;
    if(!body.firstname || body.firstname === "") throw new Error("firstname parameter is required");
    if(!body.lastname || body.lastname === "") throw new Error("lastname parameter is required");
    if(!body.email || body.email === "") throw new Error("email parameter is required");
    if(!body.password || body.password === "") throw new Error("password parameter is required");

    const result = await Register(body.firstname, body.lastname,
        body.email, body.password
    );

    res.json(result);
});

router.post('/login', async (req: Request, res: Response) => {
    const body = req.body;
    if(!body.email || body.email === "") throw new Error("email parameter is required");
    if(!body.password || body.password === "") throw new Error("password parameter is required");

    const result = await Login( body.email, body.password );
    res.json(result);
});

export const UserRouter = router;