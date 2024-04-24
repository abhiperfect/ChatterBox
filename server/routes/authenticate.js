// routes/authenticate.mjs
import express from 'express';
import connectToDatabase from '../database/postgre.js';

const app = express();

app.post('/authenticate', async (req, res) => {
  try {
    const db = connectToDatabase();
    const { user } = req.body;

    // Check if the user email is undefined or null
    if (!user || !user.email) {
      return res.status(400).json({ error: "User email is missing" });
    }
   
    // Check if the user already exists in the database
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [user.email]);

    if (existingUser.rows.length === 0) {
      // Create a new user record if the user doesn't exist
      await db.query('INSERT INTO users (username, email, profilepicture) VALUES ($1, $2, $3)', [user.name, user.email, user.picture]);
    }
    
    // Retrieve user id from users table
    const userIdResult = await db.query('SELECT userid FROM users WHERE email = $1', [user.email]);
    const userId = userIdResult.rows[0].userid; // Assuming userid is the correct column name
    
    // Retrieve connections where the current user is either userid1 or userid2
    const connections = await db.query('SELECT * FROM connections WHERE userid1 = $1 OR userid2 = $1', [userId]);

    let connectedUsers = []; 
    for (let i = 0; i < connections.rows.length; ++i) {
      const connectedUserId1 = connections.rows[i].userid1;
      const connectedUserId2 = connections.rows[i].userid2;

      // Retrieve user information for both userid1 and userid2
      const user1 = await db.query('SELECT * FROM users WHERE userid = $1', [connectedUserId1]);
      const user2 = await db.query('SELECT * FROM users WHERE userid = $1', [connectedUserId2]);

      // Add both users to the connectedUsers array
      connectedUsers.push(user1.rows[0]);
      connectedUsers.push(user2.rows[0]);
    }

    // Respond with connections
    res.status(200).json({ userId: userId, connectedUsers });
  } catch (err) {
    console.error("Error during authentication:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
