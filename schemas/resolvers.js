const { AuthenticationError } = require('apollo-server-express');
const { User, Notes } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        notes: async () => {
            return Notes.find({})
        }
    },  
    Mutation: {
        addNote: async (parent, { noteText, noteTitle }) => {
            const note = await Notes.create({ noteText, noteTitle });
            return note;
        }
    }   
};

module.exports = resolvers;

// Path: server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
