var express = require('express');
//when your middleware is automatically included in express, the syntax for including is like this 
var router = express.Router();
//otherwise, when you have to install it looks like this
var request = require('request');

const rootURL = 'https://api.github.com/';


//with most APIs, in terms of knowing what to render, it's best to just get the 
//json from the API, inspect it to see how to manipulate, then put that in your router
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {userData: null});
});

router.post('/', function(req, res) {
  var options = {
    url: `${rootURL}users/${req.body.username}`,
    headers: {
      'User-Agent': 'doriorio',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  };
  request(
    options,
    function(err, response, body) {
      var userData = JSON.parse(body);
      options.url=userData.repos_url;
      request(options, function(err, response, body){
        userData.repos = JSON.parse(body);  
        res.render('index', {userData});

      });
    }
  );
});
module.exports = router;

