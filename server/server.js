import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// Initialize Cloudinary lazily
let cloudinaryInitialized = false;
const initCloudinary = async () => {
  if (!cloudinaryInitialized) {
    await connectCloudinary();
    cloudinaryInitialized = true;
  }
};

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', async (req, res) => {
  try {
    await initCloudinary();
    res.json({ status: 'Server is running!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Initialize Cloudinary before handling API routes
app.use(async (req, res, next) => {
  try {
    await initCloudinary();
    next();
  } catch (error) {
    console.error('Cloudinary initialization error:', error);
    res.status(500).json({ error: 'Service initialization failed' });
  }
});

app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);

// Don't use app.listen() - remove these lines:
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => { console.log('Server is running on port', PORT); });

// Export for Vercel
export default app;