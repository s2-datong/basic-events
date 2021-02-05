import {Router} from "express";
import { CreateEventType, DeleteEventType, ListEventTypes, UpdateEventType } from "../controllers/EventType";
const router = Router();

function validateEventTypeBody(body: any){
    if(!body.name || body.name === "") throw new Error("name parameter is required");
    if(!body.description || body.description === "") throw new Error("description parameter is required");
}

router.post('/', async (req, res) => {
    const body = req.body;
    validateEventTypeBody(body);

    const result = await CreateEventType(body.name, body.description);
    res.json(result);
});

router.get('/', async (req, res) => {
    const result = await ListEventTypes();
    res.json(result);
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if(!id || id === "") throw new Error("id parameter is required");
    const body = req.body;
    validateEventTypeBody(body);

    const result = await UpdateEventType(id, body.name, body.description);
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if(!id || id === "") throw new Error("id parameter is required");

    const result = await DeleteEventType(id);
    res.json(result);
});

export const EventTypeRouter = router;