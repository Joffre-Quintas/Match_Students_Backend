import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_,res: Response) => {
    res.status(StatusCodes.OK).json({msg: 'Rota inicial'});
});

export default router;