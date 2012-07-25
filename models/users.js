// Users is a PRIVATE variable, only available within the scope of models/users.js
// {
//   id:1
//   ,name_first:"Bill"
//   ,name_last:"Smith"
//   ,email:"bill@smi.th"
//   ,role:"member"
//   ,pass:"12345"
// }

var mongo = require('mongodb'),
  Db = mongo.Db,
  Connection = mongo.Connection,
  Server = mongo.Server;

var db = new Db('test',new Server("127.0.0.1", Connection.DEFAULT_PORT, {}));

var hash = function (string){
  var crypto = require('crypto');
  var sha = crypto.createHash('sha1');
  sha.update(string);
  var hash = sha.digest('hex');
  return hash;
}


var UsersModel = {

  details:function (callback) {
    db.open(function(err,db){
      db.collection('users',function(err,collection){
        collection.find().toArray(function(err,results){
          db.close();
          callback(results);
        })
      })//collection
    });//open
  }, //list()

  list:function (callback) {
    db.open(function(err,db){
      db.collection('users',function(err,collection){
        collection.find().toArray(function(err,results){
          db.close();
          callback(results);
        })
      })//collection
    });//open
  }, //list()

  create:function(data){

    var pass = hash(data.pass);
    data.pass = pass;

    db.open(function(err,db){
      db.collection('users',function(err,collection){
        collection.insert({name:{first:data.name_first,last:data.name_last}});
        db.close();
      })//collection
    });//open

    return true;
  }

};

// make UsersModel PUBLICLY available to other code OUTSIDE the scope of models/users.js
// by assigning to module.exports
module.exports = UsersModel;