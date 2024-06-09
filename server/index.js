import express from 'express';
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middleware/error.js';
import userRoute from './routes/user.js';

const app = express();

dotenv.config({
  path: './.env',
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

connectDB(mongoURI);

//%%MIDDLEWARE START %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//%%MIDDLEWARE END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ROUTES
app.use('/api/v1/user', userRoute);

app.get('/', (req, res) => {
  res.send('server is ok');
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
