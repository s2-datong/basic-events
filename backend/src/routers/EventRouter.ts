import {Router, Request, Response} from "express";
import {CreateEvent, DeleteEvent, GetSingleEvent, ListEvents, UpdateEvent} from "../controllers/Event";
import { AuthAdminMiddleware } from "../middleware";
const router = Router();

function verifyEventBody(body: any){
    if(!body.name || body.name === "") throw new Error("name parameter is required");
    if(!body.description || body.description === "") throw new Error("description parameter is required");
    if(!body.event_types) throw new Error("event_types parameter is required");
    if(!Array.isArray(body.event_types)) throw new Error("event_types should be an array");
    if(body.event_types.length === 0) throw new Error("event_types cannot be an empty array");
    if(!body.date || body.date === "") throw new Error("date parameter is required");
    let _date = new Date(body.date);
    if(_date.toString() === "Invalid Date") throw new Error("invalid date supplied");
    if(!body.venue || body.venue === "") throw new Error("venue parameter is required");
}

router.post('/', AuthAdminMiddleware, async (req: Request, res: Response) => {
    const body = req.body;
    verifyEventBody(body);

    const result = await CreateEvent(
        body.name, body.description, body.event_types, new Date(body.date), body.venue
    );

    res.json(result);
});

router.get('/:id', AuthAdminMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id;
    if(!id || id === "") throw new Error("id parameter is required");

    const result = await GetSingleEvent(id);
    res.json(result);
});

router.get('/', AuthAdminMiddleware, async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const search = req.query.search ? String(req.query.search) : null;

    const result = await ListEvents(page, limit, search);
    res.json(result);
});

router.patch('/:id', AuthAdminMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id;
    if(!id || id === "") throw new Error("id parameter is required");

    const body = req.body;
    verifyEventBody(body);

    const result = await UpdateEvent(
        id, body.name, body.description, body.event_types, new Date(body.date), body.venue
    );
    res.json(result);
});

router.delete('/:id', AuthAdminMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id;
    if(!id || id === "") throw new Error("id parameter is required");

    const result = await DeleteEvent(id);
    res.json(result);
});

export const EventRouter = router;