import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialize Cloudinary
await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Serve static files from dist folder if it exists
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  // Try to serve index.html from dist, otherwise send message
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send('Server is running !!');
    }
  });
});

// Protected API routes
app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
}

// Export for Vercel
export default app;