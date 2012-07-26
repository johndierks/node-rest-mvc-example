var UsersModel = require('../models/users');

var UsersController = {

  // index method handles the GET /users route
  index: function (req, res) {
    var usersList = UsersModel.list(function(err, usersList){
      res.render('users/index', {layout: 'layout',users:usersList});
    });
    
  }
  
  ,detail: function (req, res) {
    UsersModel.detail(req.params.id,function(err,user){
      console.log('user',user)
      res.render('users/detail',{user:user});
    })
    
  }
  
  ,create: function (req, res) {
    var user = req.body.user;
    
    UsersModel.create(user,function(err){
      if(err) console.log('Error',err);
      res.redirect('/users');
    });
    
  }
  ,edit:function (req, res) {
    var user = req.body.user;
    var id = req.params.id;
    UsersModel.edit(id,user,function(err){
      res.redirect('/users/'+id);
    })
  }
  ,del:function (req, res) {
    UsersModel.delete(req.params.id,function(err){
      res.redirect('/users');
    })
  }
  
};

// expose Users to rest of node application
module.exports = UsersController;