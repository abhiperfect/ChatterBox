import express from 'express';
import cors from 'cors';

const app = express();

//%%MIDDLEWARE START %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use(cors());
//%%MIDDLEWARE END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


app.get('/',( req, res)=>{
   res.send('server is ok');
})

// Define a route to handle GET requests
app.get('/api/data', (req, res) => {
  try {
    // Simulated data
    const data = { message: 'This is the data from the server' };
    
    // Sending the data as a JSON response
    res.json(data);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(8000, ()=>{
  console.log(`Server is runnig on port ${8000}`);
})