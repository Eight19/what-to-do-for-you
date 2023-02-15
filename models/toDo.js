const { Schema, model } = require('mongoose');

const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  //Add a phone number field//
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  }
});

const User = model('User', userSchema);


module.exports = User;






// router.use('/toDo', toDo);
// router.use('/user', user);
//
// module.exports = router;
//
// //Path: routes\toDo.js
// const express = require('express');
// const router = express.Router();
// const { toDo } = require('../models');
// const { user } = require('../models');

