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
    todos: [Todo]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Note { 
    _id: ID!
    noteText: String!
    content: String!
  }
  
  type Query {
    users: [User]!
    user(id: ID!): User
    searchUsers(term: String!): [User]!
    me: User
    todos: [Todo]
    todo(id: ID!): Todo
  }

  input NoteInput {
  title: String!
  content: String!
 }
 
  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addTodo(todoText: String!): Todo
    updateTodoStatus(status: String!): Todo
    # Status Types: "IN_PROGRESS", "COMPLETED", "ARCHIVED"
  }
`;

module.exports = typeDefs;


