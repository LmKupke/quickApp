import { PubSub, AuthenticationError, UserInputError, ForbiddenError } from "apollo-server-express";
import { GraphQLScalarType } from 'graphql';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isMessageOwner } from './authorization';
const pubSub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';


export default {
  Query: {
    messages: async (parent, args, {models}) => {
      let messagesFound = await models.message.find().sort([['created_at', 'ascending']]).populate('user');
      if (!messagesFound) {
        throw new Error('Error');
      }
      return messagesFound;
    }
  },
  Mutation: {
    createMessage:  combineResolvers(
      isAuthenticated,
      async (parent, {message}, { models, me }) => {
        const createdMessage = {
          message,
          user: me.id
        }
        let newMessage = await models.message.create(createdMessage)
        if(!newMessage) {
          throw new Error("Couldnt create Message")
        }
        newMessage = await  models.message.findById(newMessage.id).populate('user');

        const authMessage = {
          id: newMessage.id,
          message: newMessage.message,
          created_at: newMessage.created_at,
          user: {
            username: newMessage.user.username,
            age: newMessage.user.age,
            location: newMessage.user.location
          }
        }

        pubSub.publish(MESSAGE_ADDED, { messageCreated:  authMessage })
        return authMessage;
    }),
  deleteMessage: combineResolvers(
    isAuthenticated,
    isMessageOwner,
    async (parent, {id}, {models}) => {
      return await models.message.deleteOne({id});
    })
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubSub.asyncIterator([MESSAGE_ADDED]),
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom Scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.Int) {
        return new Date(ast.value)
      }
      return null;
    }
  })
};

