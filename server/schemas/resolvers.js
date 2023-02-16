const { AuthenticationError } = require("apollo-server-express");
const { User, Todo } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findByPk(context.user._id).populate('todos');
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addTodo: async ( _, {todoText}, context ) => {
      if (context.user) {
        const todo = await Todo.create({
          todoText,
          todo: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { todo: todo._id } }
        );

        return todo;
      }
      throw new AuthenticationError('You need to be logged in!');
    },  
    updateTodoStatus: async ( _, { id, status }, context ) => {
      if (context.user) {
        const todo = await Todo.findOneAndUpdate(
          { _id: id }, 
          { $set: { status }},
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { todo: todo._id } },
          { new: true }
        );

        return todo;
      }
      throw new AuthenticationError('You need to be logged in!');
  },
    },   
    updateTodoStatus: async ( _, {todoText}, context ) => {
      if (context.user) {
        const todo = await Todo.create({
          todoText,
          todo: context.user.username,
        });

        await User.updateTodoStatus(
          { _id: context.user._id },
          { $addToSet: { todo: todo._id } }
        );

        return todo;
      }
      throw new AuthenticationError('You need to be logged in!');
    },   
    

  },
  updateTodoStatus: async ( _, { id, status }, context ) => {
      if (context.user) {
        const todo = await Todo.findOneAndUpdate(
          { _id: id }, 
          { $set: { status }},
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { todo: todo._id } },
          { new: true }
        );
  
        return todo;
      }
      throw new AuthenticationError('You need to be logged in!');
  },
};

module.exports = typeDefs;
