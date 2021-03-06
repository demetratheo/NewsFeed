import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Newsfeed {
    name: String!
    description: String!
  }

  type Query {
    userNewsfeed(id: Int!, page: Int!): [Newsfeed!]!
    project(id: Int!): Project!
    user(id: Int!): User!
    users: [User!]!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
