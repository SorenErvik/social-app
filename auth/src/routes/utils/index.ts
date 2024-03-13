import { Request, Response } from 'express';


export const handleMethodNotAllowed = (req: Request, res: Response) => {
    res.sendStatus(405);
};