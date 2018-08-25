const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config()
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds018268.mlab.com:18268/chat-app`)
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const app = express();
app.use('*', cors());


const port = process.env.PORT || '3000';

app.set('port', port);


const userSchema = require('./graphql/index').userSchema;

app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));


app.listen(port, () => console.log(`API running on localhost:${port} \n GraphQL server on localhost:${port}`));
