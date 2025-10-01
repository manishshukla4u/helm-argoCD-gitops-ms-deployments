app.use(express.json());

app.get('/messages', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const messages = await client.db('test').collection('messages').find().toArray();
  await client.close();
  res.json(messages);
});

app.post('/messages', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  await client.db('test').collection('messages').insertOne(req.body);
  await client.close();
  res.status(201).send('Message added');
});
