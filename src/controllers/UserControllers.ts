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
        const { password } = newUser;
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
        interface IStudent {
            period: number
        }
        const allStudents = await User.find({},{password: 0, createdAt: 0, updatedAt: 0, birthday: 0})
        const studentsByPeriod:{[key: number]:IStudent[]} = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: []
        }
        allStudents.forEach(student => {
            const { period } = student;
            studentsByPeriod[period].push(student)
        })
        res.status(StatusCodes.OK).json(studentsByPeriod)
    }
    //In frontend, the user let load using array of User on contextAPI. Verify which token match id and load data.
    static async updateRegister(req: Request, res: Response) {
        const secret = process.env.SECRET as string;
        const token = req.headers.token as string;
        const dataUpdated =  req.body;
        
        const data = await jwt.verify(token,secret) as {id:string}
        const userId = data.id;
        const userUpdated = await {
            ...dataUpdated,
            updatedAt: Date.now()
        }
        try {
            await User.findOneAndUpdate({ _id: userId }, await cryptPassword(userUpdated, dataUpdated.password))
            res.status(201).json({msg: 'Cadastro atualizado com sucesso!'})
        } catch (err) {
            console.log(err)
        }
    }
    static async findAStudent(req: Request, res: Response) {
        const { registrationNumber } = await  req.body;
        const student = await User.findOne({registrationNumber: registrationNumber })        
        res.json(student)
    }
}

export default UserControllers;