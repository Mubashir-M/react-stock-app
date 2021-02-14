const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors')

const items = require('./routes/api/items')

const app = express();

// Bodyparser Middlware

app.use(bodyParser.json())
app.use(cors())

// mongo uri
const db = require('./config/config').MONGODB_URI

// Connecting to MongoDB

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))

// Use Routes

  app.use('/api/items', items)

  const port = process.env.port || 3000

  app.listen(port, () => console.log(`server started on port ${port}`))




