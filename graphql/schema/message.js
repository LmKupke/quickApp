import {gql } from 'apollo-server-express';

export default  gql`
  extend type Query {
    messages: [Message!]
  }

  extend type Mutation {
    createMessage(message: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  extend type Subscription {
    messageCreated: Message!
  }

  type Message {
    id: ID!
    message: String!
    user: UserAuthSub!
    created_at: Date!
  }
`;
