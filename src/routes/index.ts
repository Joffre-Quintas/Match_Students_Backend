import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserControllers from '../controllers/UserControllers';
import authenticate from '../shared/middlewares/authenticate';
import validationRegister from '../shared/middlewares/validationsRegister';

const router = Router();

router.get('/', (_,res: Response) => {
    res.status(StatusCodes.OK).json({msg: 'Rota inicial'});
});
router.post('/registration', validationRegister, UserControllers.createUser)
router.post('/login', UserControllers.login)
router.get('/home', UserControllers.ListAllStudents)
router.put('/registration/update', authenticate, UserControllers.updateRegister)
router.get('/findastudent', UserControllers.findAStudent)
router.get('/finduserbyjwt/:token', UserControllers.findUserByJWT)



export default router;
