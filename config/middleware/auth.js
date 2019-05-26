const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  isAuthenticated: (req, res, next) => {
    const token = req.headers['x-auth-token'];

    if(!token) return res.status(401).json({msg: 'Must provide an access token'});

    jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
      if(err) return res.status(401).json({msg: err});


      User.findById(decoded.id).select('-select').then(user => {
        if(!user) return res.status(401).json({msg: 'Can not authenticate user'});


        req.user = user;
        req.isAuthenticated = true;

        next();
      });
    });
  },
  isAdmin: (req, res, next) => {
    if(req.user.role !== 'admin') return res.status(401).json({msg: 'You do not have the proper permissions'});

    return next()
  },
  isManager: (req, res, next) => {
    if(req.user.role === 'manager' || req.user.role === 'admin') return res.status(401).json({msg: 'You do not have the proper permissions'});

    return next()
  },
  isStaff: (req, res, next) => {
    if(req.user.role !== 'staff' || req.user.role !== 'manager' || req.user.role !== 'admin') {
       return res.status(401).json({msg: 'You do not have the proper permissions'});
     }

    return next()
  },
  isVolunteer: (req, res, next) => {
    if(req.user.role === 'volunteer' || req.user.role === 'staff' || req.user.role === 'manager' || req.user.role === 'admin') {
      return res.status(401).json({msg: 'You do not have the proper permissions'});
    }

    return next();
  }
}
