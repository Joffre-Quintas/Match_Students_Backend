import { Router, Response } from 'express';

const router = Router();

router.get('/', (_,res: Response) => {
    res.status(200).json({msg: 'Rota inicial'});
});

export default router;