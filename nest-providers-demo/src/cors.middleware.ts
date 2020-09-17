import { Request, Response } from "express";

export const enableCors = (req:Request, res:Response, next:Function) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization');

    next();
}