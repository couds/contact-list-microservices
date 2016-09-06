import User, { IGNORED_FIELD } from 'models/user';
import express from 'express';

const router = express.Router();

// GET /users
// Get a list of users
export function getAllUsers(req, res) {
  User.find({}, IGNORED_FIELD, function(err, users) {
    if (err) {
      return res.status(500).json({
        message: `Error listing users: ${err.message}`,
      });
    }
    res.json(users);
  });
}

export function getUser(req, res) {
  User.findOne({
    _id: req.swagger.params.id.value
  }, IGNORED_FIELD, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: `Error reading user: ${err.message}`,
      });
    }

    if (!user) {
      return res.status(404).json({
        message: 'No user found',
      });
    }

    res.json(user);
  });
}

export function editUser(req, res) {
  // User.
  User.findOneAndUpdate({
    _id: req.swagger.params.id.value
  }, req.body, IGNORED_FIELD, function(err, user) {
    if (err) {
      return res.status(500).json({
        message: `Error reading user: ${err.message}`,
      });
    }

    if (!user) {
      return res.status(404).json({
        message: 'No user found',
      });
    }

    getUser(req, res);
  });
}

export function deleteUser(req, res) {
  // User.
  User.remove({
    _id: req.swagger.params.id.value
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        message: `Error deleting user: ${err.message}`,
      });
    }
    res.status(204).end();
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