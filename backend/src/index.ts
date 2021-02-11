import express, {NextFunction, Request, Response} from "express";
import {config} from "dotenv";
config();
import {json} from "body-parser";
import cors from "cors";
import { EventRouter } from "./routers/EventRouter";
import { EventTypeRouter } from "./routers/EventTypeRouter";
import { UserRouter } from "./routers/UserRouter";
import { BootstrapDB } from "./controllers/Bootstrap";

const app = express();
app.use(json());
app.use(cors());

app.use(express.static('../frontend'))

app.use('/v1/event', EventRouter);
app.use('/v1/event_type', EventTypeRouter);
app.use('/v1/user', UserRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({message: err.message});
})

const port = process.env.PORT || 3000;
BootstrapDB().then(() => {

    app.listen(port, () => {
        console.log('listening on ' + port);
    })
    
});