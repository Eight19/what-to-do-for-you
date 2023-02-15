const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true
  },
});

const Todo = model('Note', noteSchema);

module.exports = Note;