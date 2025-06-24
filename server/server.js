// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { healthRouter, designRouter } from './routes/index.js';
import { errorHandler } from './middlewares/index.js';
import connectDB from './db/connect.js';

// Configuration
dotenv.config();
const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' 
    : 'https://yourdomain.com'
}));
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/design', designRouter);

// Error Handler
app.use(errorHandler);

// Start Server with DB connection
connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`
        Server running in ${process.env.NODE_ENV || 'development'} mode
        Listening on port ${PORT}
        Ready at http://localhost:${PORT}
      `);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
  