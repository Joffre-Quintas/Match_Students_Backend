import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function authenticate(req: Request,res: Response, next:NextFunction) {
    const auth = req.headers.token;
    console.log(auth)
    if(!auth){
        return res.status(StatusCodes.NOT_FOUND).json({msg: 'Necessário realizar o login.'})
    }
    next()
}