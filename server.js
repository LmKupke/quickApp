const express = require('express');
import * as http  from 'http';
import { ApolloServer,  AuthenticationError } from 'apollo-server-express';
import schema from './graphql/schema';
import resolvers from './graphql/resolver';
import models from './models'

const mongoose = require('mongoose');
require('dotenv').config()
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds018268.mlab.com:18268/chat-app`)
const cors = require("cors");
const app = express();
import jwt from 'jsonwebtoken';
app.use('*', cors());

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};



const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection  }) => {
    if (connection) {
      return {
        models,
      }
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
      }
    }
  },
  playground: {
    settings: {
      'editor.theme': 'dark',
      'editor.cursorShape': 'line'
    }
  },
  formatError: error => {
    const message = error.message
      .replace("message validation failed: " , '')
      .replace("message: ", '')
      .replace("users validation failed: ", "")
      .replace("name: ", "")

    return {
      ...error,
      message,
    }
  }
});

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


const port = process.env.PORT || '3000';


httpServer.listen(port, () => {
  console.log(`API running on localhost:${port} \n GraphQL server on localhost:${port}`)

}

);
