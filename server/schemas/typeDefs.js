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
    users: [User]!
    user(id: ID!): User
    searchUsers(term: String!): [User]!
    me: User
    todos: [Todo]
    todo(id: ID!): Todo
  }
  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addTodo(text: String!): Todo
    updateTodoStatus(status: String!): Todo
    # Status Types: "IN_PROGRESS", "COMPLETED", "ARCHIVED"
  }
`;

module.exports = typeDefs;