const toDo = require('./toDo');
const user = require('./User');

module.exports = { toDo, user };

//Path: models\ToDo.js
const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;

//Path: models\User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

//Path: routes\index.js
const express = require('express');
const router = express.Router();

const toDo = require('./toDo');
const user = require('./user');

router.use('/toDo', toDo);
router.use('/user', user);

module.exports = router;

//Path: routes\toDo.js
const express = require('express');
const router = express.Router();
const { toDo } = require('../models');
const { user } = require('../models');

router.get('/', (req, res) => {
    toDo.find()
        .then(toDos => res.json(toDos))
        .catch(err => res.json(err));
});

router.get('/:id', (req, res) => {
    toDo.findById(req.params.id)
        .then(toDo => res.json(toDo))
        .catch(err => res.json(err));
});

router.post('/', (req, res) => {
    toDo.create(req.body)
        .then(toDo => res.json(toDo))
        .catch(err => res.json(err));
});

router.put('/:id', (req, res) => {
});
