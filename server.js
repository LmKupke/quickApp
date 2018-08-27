const express = require('express');
import * as http  from 'http';
import { ApolloServer } from 'apollo-server-express';
import { schema, resolvers } from './graphql/index';
import { models } from './models'

const mongoose = require('mongoose');
require('dotenv').config()
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds018268.mlab.com:18268/chat-app`)
const cors = require("cors");
const app = express();


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
      const me = await models.userModel.findOne({username: "kupkel"});

      return {
        models,
        me,
      }
    }
  }
});

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use('*', cors());


const port = process.env.PORT || '3000';


httpServer.listen(port, () => {
  console.log(`API running on localhost:${port} \n GraphQL server on localhost:${port}`)

}

);
