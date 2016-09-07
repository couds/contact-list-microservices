import User, { IGNORED_FIELD } from 'models/user';
import express from 'express';

const router = express.Router();

// GET /users
// Get a list of users
export function getAllUsers(req, res) {
  User.find({})
    .select({ "_id": 1, "name": 1, "picture": 1 })
    .then(users => res.json(users))
    .catch(err => {
      res.status(500).json({
        message: `Error listing users: ${err.message}`,
      });
    });
}

export function getUser(req, res) {
  User.findOne({
    _id: req.swagger.params.id.value
  })
    .select(IGNORED_FIELD)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'No user found',
        });
      }
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: `Error reading user: ${err.message}`,
      });
    });
}

export function editUser(req, res) {
  // User.
  User.findOneAndUpdate({
    _id: req.swagger.params.id.value
  }, req.body)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'No user found',
        });
      }
      getUser(req, res);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error reading user: ${err.message}`,
      });
    });
}

export function deleteUser(req, res) {
  // User.
  User.remove({
    _id: req.swagger.params.id.value
  })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({
        message: `Error deleting user: ${err.message}`,
      });
    });
}

export function createUser(req, res) {
  new User(req.body).save()
    .then(function(user) {
      res.status(201).json(user);
    })
    .catch(function(err) {
      res.status(500).json({
        message: `Error creating the user ${err.message}`,
      });
    })
}