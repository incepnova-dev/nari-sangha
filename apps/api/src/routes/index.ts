import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

export default router;

