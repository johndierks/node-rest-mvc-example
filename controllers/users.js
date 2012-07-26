var UsersModel = require('../models/users');

var UsersController = {

  // index method handles the GET /users route
  index: function (req, res) {
    var usersList = UsersModel.list(function(usersList){
      res.render('users/index', {users:usersList});
    });
    
  }
  
  ,detail: function (req, res) {
    
    UsersModel.detail(req.params.id,function(user){
      res.render('users/detail',{user:user[0]});
    })
    
  }
  
  ,create: function (req, res) {
    var user = req.body.user;
    
    UsersModel.create(user,function(err){
      if(err) console.log('Error',err);
      res.redirect('/users');
    });
    
  }
  ,edit:function (req, res) {}
  ,del:function (req, res) {}
  
};

// expose Users to rest of node application
module.exports = UsersController;