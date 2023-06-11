import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel';
import IUser from '../shared/types/TypeUser';
import { Request, Response } from 'express';


import verifyExist from '../shared/utils/verifyExist';
import cryptPassword from '../shared/utils/cryptPassword';
class UserControllers {
    static async createUser(req: Request, res: Response) {
        const newUser:IUser  = req.body;
        const { completeName, registrationNumber, birthday, phone, period, turn, course, isAvaliable, email, password } = newUser;
        
        //Validations
        if(!completeName || !registrationNumber || !birthday || !phone || !period || !turn || !course || !isAvaliable || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Preencha todos os campos.'})
        }
        if(await verifyExist({phone: phone})) {
            return res.status(422).json({msg: 'Telefone já cadastrado.'})
        }
        if(await verifyExist({email:email} || await verifyExist({registrationNumber: registrationNumber}))) { 
            return res.status(422).json({msg: 'Usuário já cadastrado.'})
        }
        //Crypt password. I do a util async function 'cryptPassword' and replace than newUser inside a create. Line '26'
        //Create User
        await User.create(await cryptPassword(newUser, password))
        res.status(StatusCodes.OK).json({msg:'Usuário cadastrado!'})
    }
}

export default UserControllers;