const { AuthenticationError } = require("apollo-server-express");
const { User, Todo } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, _args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('todos');
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    todos: async () => {
      return await Todo.find();
    }
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
    addTodo: async ( _, args, context ) => {
      if (context.user) {
        const todo = await Todo.create(args);



        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { todos: todo._id } },
          { new: true }
        ).populate('todos');

        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },   
    updateTodoStatus: async ( _, {todoText}, context ) => {
      if (context.user) {
        const todo = await Todo.create({
          todoText,
          todo: context.user.username,
        });

        const user = await User.updateTodoStatus(
          { _id: context.user._id },
          { $addToSet: { todos: todo._id } },
          { new: true }
        ).populate('todos');

        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },   
  },
};

module.exports = resolvers;
