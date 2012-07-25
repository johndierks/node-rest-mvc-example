var UsersModel = require('../models/users');

var UsersController = {

  // index method handles the GET /users route
  index: function (req, res) {
    var usersList = UsersModel.list(function(usersList){
      res.render('users/index', {users:usersList});
    });
    
  }
  
  ,detail: function (req, res) {
    res.render('users/detail');
  }
  
  ,create: function (req, res) {
    var user = req.body.user;
    var created = UsersModel.create(user);
    if (created){
      res.redirect('/users');
    }
  }
  ,edit:function (req, res) {}
  ,del:function (req, res) {}
  
};

// expose Users to rest of node application
module.exports = UsersController;