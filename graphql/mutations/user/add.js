var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var UserType = require('../../types/user');
var UserModel = require('../../../models/User')

exports.add = {
  type: UserType.userType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    location: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  },
  resolve(root, params) {
    const uModel = new UserModel(params);
    if(!uModel) {
      throw new Error('Error saving new user')
    }
    return uModel;
  }
}
