var express = require("express"),
app = express(),
methodOverride = require('method-override'),
bodyParser = require("body-parser");

var db = require("./models");

var morgan = require('morgan');
app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', function(req,res){
	res.redirect('/users');
});

app.get('/users', function(req,res){
  db.User.find({}, function(err, users){
	if(err){
	  console.log(err)
	} else {
	  res.render('index', {users:users});
	}
  })
});

app.get('/users/new', function(req,res){
	res.render('new');
});

app.post('/users', function(req,res){
	db.User.create(req.body.user, function(err, user){
	if(err){
	  console.log(err)
	} else {
	  console.log(req.body.user);
	  res.redirect('/users');
	}
  })
});

app.get('/users/:id', function(req,res){
	db.User.findById(req.params.id, function (err,foundUser){
	if(err){
	  console.log(err)
	} else {
	  res.redirect('show', {user:foundUser});
	}
  })
});

app.get('*', function(req,res){
  res.render('404');
});

app.listen('2323', function(){
	console.log("Server is listening on Port: 2323")
});