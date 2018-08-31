import {gql } from 'apollo-server-express';

export default  gql`
  extend type Query {
    users: [User!]
  }

  extend type Mutation {
    signUp(name: String!, username: String!, password: String!, location: String, age: Int): UserAuth!
    signIn(username: String!, password: String!):UserAuth!
  }

  extend type Subscription {
    userCreated: UserAuthSub!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    location: String
    age: Int
  }

  type UserAuthSub {
    username: String!
    age: Int
    location: String
  }

  type UserAuth {
    user: UserAuthSub!
    token: String!
  }

`;
