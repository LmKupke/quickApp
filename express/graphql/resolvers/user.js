import { PubSub, AuthenticationError, UserInputError, ForbiddenError } from "apollo-server-express";
const jwt = require('jsonwebtoken');

const pubSub = new PubSub();
const USER_SIGNED_IN = 'USER_SIGNED_IN';

const createToken = async (user, secret, expiresIn) => {
  const {id, username} = user;
  return await jwt.sign({ id, username}, secret, { expiresIn, });
}

export default {
  Query: {
    users: (parent, args, {models}) => {
        const users = models.user.find().exec()
        if (!users) {
          throw new Error('Error')
        }
        return users;
    }
  },
  Mutation: {
    signUp: async (parent, { name, username, password, location, age}, {models, me, secret}) => {
      const newUser = await models.user.create({name, username, password, location, age})
      if(!newUser) {
        throw new Error('Error')
      }
      const subScribedUser = {
        username: newUser.username,
        age: newUser.age,
        location: newUser.location
      };

      pubSub.publish(USER_SIGNED_IN, { userCreated: subScribedUser});
      const returnedUser = {
        user: {
          username: newUser.username,
          location: newUser.location,
          age: newUser.age
        },
        token: createToken(newUser, secret, '30m')
      }

      return returnedUser;
    },
    signIn: async (_, {username, password}, {models, me, secret}) => {
      const userFound = await models.user.findOne({username});
      if (!userFound) {
        throw new UserInputError("No user found with this login credentials.")
      }
      const isValid = await userFound.validatePassword(password);
      if(!isValid) {
        throw new AuthenticationError('Password is not valid');
      }
      const userAuthSub = {
        user: {
          username: userFound.username,
          location: userFound.location,
          age: userFound.age
        },
        token: createToken(userFound,secret,'30m')
      }

      return userAuthSub;
    }
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubSub.asyncIterator([USER_SIGNED_IN]),
    }
  }
};

