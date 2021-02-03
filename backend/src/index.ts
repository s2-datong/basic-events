import express, {Request, Response} from "express";
import {json} from "body-parser";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on ' + port);
})