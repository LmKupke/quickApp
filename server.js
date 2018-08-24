const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds018268.mlab.com:18268/chat-app`)

const api = require('./server/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'dist/chatApp')));

app.use('/api', api);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/chatApp/index.html'))
});

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
