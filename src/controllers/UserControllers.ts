import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel';
import IUser from '../shared/types/TypeUser';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Utils
import verifyExist from '../shared/utils/verifyExist';
import cryptPassword  from '../shared/utils/cryptPassword';
import { ErrorMessages } from '../shared/utils/ErrorMessages'

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
            return res.status(422).json({msg: ErrorMessages.userExist})
        }
        
        try {
            //Crypt password. I do an util async function 'cryptPassword' and replace than newUser inside a create. Line '27'
            //Create User
            await User.create(await cryptPassword(newUser, password))
            res.status(StatusCodes.OK).json({msg:ErrorMessages.userExist})       
        } catch (err) {
            console.error(err)    
        }
        
    }
    static async login(req:Request, res: Response) {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: ErrorMessages.emptyFields})
        }
        if(!(await verifyExist({email: email}))) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: ErrorMessages.userNotExist}) 
        }
        try {
            const userData = await User.findOne({email: email})
            if(userData) {
                const checkPassword: boolean = await bcrypt.compare(password, userData.password)
                if(!checkPassword) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({msg: ErrorMessages.incorrectPassword})
                }
                const secret = process.env.SECRET;
                if(!secret) {
                    return res.status(StatusCodes.NOT_FOUND).json({msg: 'Secret não definido!'})
                }
                const token = jwt.sign(
                    {
                        id: userData._id
                    },
                    secret,
                    // {
                    //     expiresIn: '7d'
                    // }
                )
                res.status(StatusCodes.OK).json({token})
            }
        } catch (err) {
            console.log(err)
        }
    }
    //Some camps was excluded for security
    static async ListAllStudents(req: Request, res: Response) {
        const allStudents = await User.find({},{password: 0, createdAt: 0, updatedAt: 0, birthday: 0})
        res.status(StatusCodes.OK).json(allStudents)
    }
}

export default UserControllers;