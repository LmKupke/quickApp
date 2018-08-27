 import { userModel } from '../models/User'
 import { messageModel } from '../models/Message';
import { gql, PubSub } from "apollo-server-express";
import { GraphQLScalarType } from 'graphql';

const pubSub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';
const USER_ADDED = 'USER_ADDED';
export const schema = gql`
  type Query {
    users: [User!]
    user(username: String!): User
  }

  type Mutation {
    addUser(name: String!, username: String!, password: String!, location: String, age: Int): User!
    createMessage(message: String!): Message!
  }

  type Subscription {
    messageCreated: Message!
    userCreated: User
  }

  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    location: String
    age: Int
  }

  type Message {
    id: ID!
    message: String!
    user: User
    created_at: Date!
  }

  scalar Date
`;

export const resolvers = {
  Query: {
    users: () => {
        const users = userModel.find().exec()
        if (!users) {
          throw new Error('Error')
        }
        return users;
    },
    user: async (_, args) => {
        const userFound = await userModel.findOne( args );
        return userFound;
    }
  },
  Mutation: {
    addUser: (parent, { name, username, password, location, age}) => {
      const newUser = userModel.create({name, username, password, location, age})
      if(!newUser) {
        throw new Error('Error')
      }
      pubSub.publish(USER_ADDED, { userCreated: newUser});
      return newUser;
    },
    createMessage: async (parent, {message}, { me }) => {
      const createdMessage = {
        message,
        user: me
      };
      const newMessage = await messageModel.create(createdMessage)

      if(!newMessage) {
        throw new Error("Couldnt create Message")
        return;
      }
      pubSub.publish(MESSAGE_ADDED, { messageCreated:  newMessage })
      return newMessage;
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubSub.asyncIterator([MESSAGE_ADDED]),
    },
    userCreated: {
      subscribe: () => pubSub.asyncIterator([USER_ADDED]),
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom Scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.Int) {
        return new Date(ast.value)
      }
      return null;
    }
  })
};

