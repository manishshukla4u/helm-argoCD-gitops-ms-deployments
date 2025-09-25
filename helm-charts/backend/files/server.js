const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongodb:27017';

app.get('/', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('messages');
    const message = await collection.findOne() || { text: 'Hello from Backend' };
    res.send(message.text);
    await client.close();
  } catch (err) {
    res.status(500).send('Error connecting to MongoDB');
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
