const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const passport = require('../passport');

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
  console.log('===== user!!======');
  console.log(req.user);
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

router.post(
  '/login',
  function(req, res, next) {
    console.log(req.body);
    console.log('================');
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('POST to /login');
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser.local) {
      console.log(`Deleting ${cleanUser.local.password}`);
      delete cleanUser.local.password;
    }
    res.json({ user: cleanUser });
  }
);

router.post('/logout', (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid'); // clean up!
    return res.json({ msg: 'logging you out' });
  } else {
    return res.json({ msg: 'no user to log out!' });
  }
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  // ADD VALIDATION
  User.findOne({ 'local.username': username }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    }
    const newUser = new User({
      'local.username': username,
      'local.password': password
    });
    newUser.save((err, savedUser) => {
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
});

router.post('/userInfo', (req, res) => {
  const { id, firstname, lastname, email, profession, interests, seeking, note } = req.body;
  User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        firstName: firstname,
        lastName: lastname,
        'local.email': email,
        'local.profession': profession,
        'local.interests': interests,
        'local.seeking': seeking,
        'local.note': note
      }
    },
    { returnNewDocument: true }
  ).then(data => {
    console.log(data);
    res.json(data);
  });
  console.log("You've updated hooray");
});

router.get('/retrieve', (req, res) => {
  User.find({'local.interests': 'Programming'}).then(data => res.json(data))
});


module.exports = router;
