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
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodoStatus(status: String!): Todo
    # Status Types: "IN_PROGRESS", "COMPLETED", "ARCHIVED"
  }
`;
