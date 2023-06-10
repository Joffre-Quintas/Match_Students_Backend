import { NextFunction } from 'express';

interface IAsyncFunc {
    req: Request
    res: Response
    next?: NextFunction
}