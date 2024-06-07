import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import authenticateRoute from './routes/authenticate.js'
import connectToDatabase from './database/postgre.js';
import messagesRouter from './controllers/messages.mjs';
const db = connectToDatabase();
const app = express();

//%%MIDDLEWARE START %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authenticateRoute);
app.use('/api/messages', messagesRouter);
//%%MIDDLEWARE END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

app.get('/',( req, res)=>{
   res.send('server is ok');
})


app.listen(8000, ()=>{
  console.log(`Server is runnig on port ${8000}`);
})