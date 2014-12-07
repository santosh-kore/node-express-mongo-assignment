var express = require('express');
var router = express.Router();

var fetchById = function(req, res) {
  var db = req.db;
  var userCollection = db.get('userCollection');
  return userCollection.find({_id: req.params.id}, {});
}

/* GET users listing. */
router.get('/', function(req, res) {
  var db = req.db;
  var userCollection = db.get('userCollection');
  userCollection.find({}, {}, function(err, data) {
  	if(err) {
  		res.send("Error occured");
  		res.end();
  	} else {
  		res.render('userlist', {
            "userlist" : data
        });
  	}
  });
});

/* Add new user template. */
router.get('/add', function(req, res) {
	console.log("add");
	res.render('newuser', {});
});

/* GET individual user details. */
router.get('/:id', function(req, res) {
	var promise = fetchById(req, res);
	promise.on('error', function(err) {
		res.send("Error occured");
  		res.end();
	});
	promise.on('success', function(data) {
		res.render('user', {
        	"user" : data[0]
    	});	
	})
});

/* Add new user. */
router.post('/newuser', function(req, res) {
  var db = req.db;
  var userCollection = db.get('userCollection');
  userCollection.insert(
  	{ name: { firstName: req.body.firstName, lastName: req.body.lastName }, 
  	  email: req.body.email, gender: req.body.gender, 
  	  company: req.body.company, city: req.body.city}, function(err, doc) {
  	if(err) {
  		res.send("Error occured");
  		res.end();
  	} else {
  		res.location("users");
        // And forward to success page
        res.redirect("/users");
  	}
  });
});

/* Edit user template with pre-populated user data */
router.get('/:id/edit', function(req, res) {
	var promise = fetchById(req, res);
	promise.on('error', function(err) {
		res.send("Error occured");
  		res.end();
	});
	promise.on('success', function(data) {
		res.render('edituser', {
        	"user" : data[0]
    	});	
	})
});

/* Edit selected user */
router.put('/edituser', function(req, res) {
  var db = req.db;
  var userCollection = db.get('userCollection');
  userCollection.update({_id: req.body.id}, 
  	{ name: { firstName: req.body.firstName, lastName: req.body.lastName }, 
  	  email: req.body.email, gender: req.body.gender, 
  	  company: req.body.company, city: req.body.city}, function(err, doc) {
  	if(err) {
  		res.send("Error occured");
  		res.end();
  	} else {
  		res.location("users");
        // And forward to success page
        res.redirect("/users");
  	}
  });
});

/* Delete user using http delete. */
router.delete('/user/:id', function(req, res) {
  var db = req.db;
  console.log("message");
  var userCollection = db.get('userCollection');
  userCollection.remove(
  	{ _id: req.body.id }, function(err, doc) {
  	if(err) {
  		res.send("Error occured");
  		res.end();
  	} else {
  		res.location("users");
        // And forward to success page
        res.redirect("/users");
  	}
  });
});

/* Delete user using http get */
router.get('/user/:id', function(req, res) {
  var db = req.db;
  console.log("message");
  var userCollection = db.get('userCollection');
  userCollection.remove(
  	{ _id: req.params.id }, function(err, doc) {
  	if(err) {
  		res.send("Error occured");
  		res.end();
  	} else {
  		res.location("users");
        // And forward to success page
        res.redirect("/users");
  	}
  });
});

module.exports = router;
