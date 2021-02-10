import {Router, Request, Response} from "express";
import { CreateEventType, DeleteEventType, ListEventTypes, UpdateEventType } from "../controllers/EventType";
import { AuthAdminMiddleware } from "../middleware";
const router = Router();

function validateEventTypeBody(body: any){
    if(!body.name || body.name === "") throw new Error("name parameter is required");
    if(!body.description || body.description === "") throw new Error("description parameter is required");
}

router.post('/', AuthAdminMiddleware, async (req: Request, res: Response) => {
    try{
        const body = req.body;
        validateEventTypeBody(body);

        const result = await CreateEventType(body.name, body.description);
        res.json(result);
    }catch(e){
        res.status(400).json({message: e.message});
    }
});

router.get('/', async (req: Request, res: Response) => {
    try{
        const result = await ListEventTypes();
        res.json(result);
    }catch(e){
        res.status(400).json({message: e.message});
    }
});

router.patch('/:id', AuthAdminMiddleware, async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        if(!id || id === "") throw new Error("id parameter is required");
        const body = req.body;
        validateEventTypeBody(body);

        const result = await UpdateEventType(id, body.name, body.description);
        res.json(result);
    }catch(e){
        res.status(400).json({message: e.message});
    }
});

router.delete('/:id', AuthAdminMiddleware, async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        if(!id || id === "") throw new Error("id parameter is required");

        const result = await DeleteEventType(id);
        res.json(result);
    }catch(e){
        res.status(400).json({message: e.message});
    }
});

export const EventTypeRouter = router;