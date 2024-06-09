import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors';
const app = express();

//%%MIDDLEWARE START %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use(cors());
app.use(bodyParser.json());

//%%MIDDLEWARE END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

app.get('/',( req, res)=>{
   res.send('server is ok');
})


app.listen(8000, ()=>{
  console.log(`Server is runnig on port ${8000}`);
})