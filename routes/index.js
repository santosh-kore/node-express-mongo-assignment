var express = require('express');
var router = express.Router();

/* GET home page. */
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
  })
});

module.exports = router;
