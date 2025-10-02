const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();  // <-- define app BEFORE using it
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongodb:27017';

app.use(express.json());

// GET /messages
app.get('/messages', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const messages = await client.db('test').collection('messages').find().toArray();
    await client.close();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).send('MongoDB connection error');
  }
});

// POST /messages
app.post('/messages', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const message = {
      text: req.body.text,
      createdAt: new Date() // add timestamp
    };

    await client.db('test').collection('messages').insertOne(message);
    await client.close();
    res.status(201).send('Message added');
  } catch (err) {
    console.error('Error adding message:', err.message);
    res.status(500).send('MongoDB connection error');
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
