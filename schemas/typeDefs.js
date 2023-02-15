const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type todo {
    _id: ID
    noteText: String
    noteTitle: String
    createdAt: String
    updatedAt: String
    }
  type user {
    _id: ID
    type: String
    username: String
    email: String
    phoneNumber: String
    password: String
    }
    type Query {
        notes: [Notes]
        note (noteId: ID!): Notes
    }
    type Mutation {
        addNote(noteText: String!, noteTitle: String!): Notes
        updateNote(noteId: ID!, noteText: String!, noteTitle: String!): Notes
        deleteNote(noteId: ID!): Notes
    }
`;



module.exports = typeDefs;

// Path: schemas\resolvers.js
// Compare this snippet from schemas\index.js:
// const typeDefs = require('./typeDefs');
// const resolvers = require('./resolvers');
//
// module.exports = { typeDefs, resolvers };
//
