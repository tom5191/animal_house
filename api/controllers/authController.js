const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  login: (req,res) => {
    const {username, password} = req.body;

    User.findOne({username: username, deletedAt: null}).then(user => {
      if(!user) {
        return res.status(404).json({msg: 'No user found'});
      }

      bcrypt.compare(password, user.password).then(match => {
        if(!match) {
          return res.status(401).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({id:user.id}, config.get('jwtSecret'));

        return res.json({token: token});
      });
    });
  }
}
