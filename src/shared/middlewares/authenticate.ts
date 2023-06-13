import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export default async function authenticate(req: Request,res: Response, next:NextFunction) {
    const auth = req.headers.token as string;
    const secret = process.env.SECRET as string;

    console.log(auth)
    if(!auth){
        return res.status(StatusCodes.NOT_FOUND).json({msg: 'Necessário realizar o login.'})
    }
    try {
        const validToken = await jwt.verify(auth, secret ) 
        next()        
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Token inválido!'})
    }
}