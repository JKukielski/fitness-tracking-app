import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

//REGISTER ENDPOINT

app.use('/api/auth', authRoutes);

//basic endpoint for postman testing: SUCCESS
app.get('/api', (req, res) => res.send('Successful endpoint test'));

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

connectToMongoDB();
app.listen(process.env.PORT || 6001, () => {
  console.log(`Running on port: ${process.env.PORT}`);
});
