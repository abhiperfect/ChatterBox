import express from 'express';
import bodyParser from 'body-parser'; 
import dotenv from "dotenv";
import cors from 'cors';

const app = express();
import {connectDB} from "./utils/features.js";



dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 8000;


connectDB(mongoURI);

//%%MIDDLEWARE START %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use(cors());
app.use(bodyParser.json());

//%%MIDDLEWARE END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

app.get('/',( req, res)=>{
   res.send('server is ok');
})


app.listen(port, ()=>{
  console.log(`Server is runnig on port ${port}`);
})