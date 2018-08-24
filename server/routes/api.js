const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/', (req,res) => {
  res.send('api works');
});

router.get('/users', (req,res) => {
  User.find({}).exec(function(err,users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
});

router.post('/user', (req,res) => {
  let user = req.body;
  let newUser = new User({...req.body});
  newUser.save(function(err) {
    if(err) {
      console.log(err);
    }
  })
});

module.exports = router;
