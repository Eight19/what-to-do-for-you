const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Todo {
    _id: ID
    text: String
    status: String
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    todos: [Todo]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addTodo(text: String!): User
    updateTodoStatus(id: ID!, status: String!): User
    # Status Types: "IN_PROGRESS", "COMPLETED", "ARCHIVED"
  }
`;


module.exports = typeDefs;

