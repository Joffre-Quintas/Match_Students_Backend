import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

//Utils
import { ErrorMessages } from '../utils/ErrorMessages';
import verifyExist from '../utils/verifyExist';
import { regex } from '../utils/regex';

export default async function validationRegister(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;
    const { completeName, registrationNumber, birthday, phone, period, turn, course, isAvaliable, email, password } = newUser;
    
    if(!completeName || !registrationNumber || !birthday || !phone || !period || !turn || !course || !isAvaliable || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Preencha todos os campos.'})
    }
    if(await verifyExist({registrationNumber: registrationNumber})) {
        return res.status(422).json({msg: ErrorMessages.userExist})
    }
    if(registrationNumber.lenght != 8){
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({msg: ErrorMessages.invalidFormat})
    }
    if(await verifyExist({phone: phone})) {
        return res.status(422).json({msg: 'Telefone já cadastrado.'})
    }
    if(!regex.phone.test(phone)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({msg: ErrorMessages.invalidFormat})
    }
    if(await verifyExist({email:email} || await verifyExist({registrationNumber: registrationNumber}))) { 
        return res.status(422).json({msg: ErrorMessages.userExist})
    }
    if(!regex.email.test(email)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({msg: ErrorMessages.invalidFormat})
    }
    if(period <= 0 || period > 8 ) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({msg: ErrorMessages.invalidFormat})
    }

    next()
}