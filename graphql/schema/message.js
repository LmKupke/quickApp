import {gql } from 'apollo-server-express';

export default  gql`
  extend type Query {
    messages: [Message!]
  }

  extend type Mutation {
    createMessage(message: String!): Message!
    deleteMessage(id: ID!): Boolean!
    typingMessage(status: Boolean!): Boolean
  }

  extend type Subscription {
    messageCreated: Message!
    messageTyping: TypingStatus!
  }

  type TypingStatus {
    status: Boolean!
    user: String!
  }

  type Message {
    id: ID!
    message: String!
    user: UserAuthSub!
    created_at: Date!
  }
`;
