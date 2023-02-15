const { AuthenticationError } = require("apollo-server-express");
const { User, Todo } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    searchUsers: async (_parent, args) => {
      const search = args.term;
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(search);
      return User.find({
        $or: [
          {
            email: {
              $regex: searchRgx,
              $options: "i",
            },
          },
          {
            username: {
              $regex: searchRgx,
              $options: "i",
            },
          },
        ],
      });
    },
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    todos: async () => {
      return Todo.find();
   },
    todo: async (_, args) => {
      return Todo.findOne({ _id: args.id });

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
