import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserControllers from '../controllers/UserControllers';

const router = Router();

router.get('/', (_,res: Response) => {
    res.status(StatusCodes.OK).json({msg: 'Rota inicial'});
});
router.post('/registration', UserControllers.createUser)
router.post('/login', UserControllers.login)

export default router;