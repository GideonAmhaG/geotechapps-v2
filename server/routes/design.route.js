import { Router } from 'express';
import { calculateFoundation } from '../controllers/index.js';

const router = Router();
router.post('/', calculateFoundation);

export default router;
