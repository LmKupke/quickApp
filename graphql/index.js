var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/user').queryType;

exports.userSchema = new GraphQLSchema({
  query: queryType
});
