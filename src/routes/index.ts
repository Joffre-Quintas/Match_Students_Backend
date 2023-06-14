import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserControllers from '../controllers/UserControllers';
import authenticate from '../shared/middlewares/authenticate';

const router = Router();

router.get('/', (_,res: Response) => {
    res.status(StatusCodes.OK).json({msg: 'Rota inicial'});
});
router.post('/registration', UserControllers.createUser)
router.post('/login', UserControllers.login)
router.get('/home', UserControllers.ListAllStudents)

router.get('/private', authenticate ,(req,res) => {
    res.json({msg: 'Private'})
})

export default router;