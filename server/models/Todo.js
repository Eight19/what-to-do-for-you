const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true
  },
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;
