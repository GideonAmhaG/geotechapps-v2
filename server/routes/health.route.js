import { Router } from 'express';
import { healthCheck } from '../controllers/index.js';

const router = Router();
router.get('/health', healthCheck); 

export default router;