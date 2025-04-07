import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedWines: [Wine]
  }

  type Wine {
    wineId: ID!
    name: String!
    type: String
    region: String
    rating: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  input WineInput {
    wineId: ID!
    name: String!
    type: String
    region: String
    rating: Float
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveWine(wineData: WineInput!): User
    removeWine(wineId: ID!): User
  }
`;

export default typeDefs;
