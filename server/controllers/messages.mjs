import express from 'express';
import connectToDatabase from '../database/postgre.js';

const router = express.Router();

// API endpoint to retrieve messages between two users
router.get('/:senderId/:recipientId', async (req, res) => {
  const db = connectToDatabase();
  const { senderId, recipientId } = req.params;

  // Check if senderId or recipientId is null or undefined
  if (!senderId || !recipientId) {
    return res.status(400).json({ error: 'Sender ID and recipient ID are required' });
  }

  try {
    const messages = await db.query('SELECT * FROM messages WHERE (senderid = $1 AND receiverid = $2) OR (senderid = $2 AND receiverid = $1)', [senderId, recipientId]);

    res.json(messages.rows);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
