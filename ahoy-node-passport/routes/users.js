var express = require('express');
var router = express.Router();
const mongod = require('./mongod');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/register', async (req, res) => {
  console.log(req.body);
  const user = new mongod(req.body);
  await user.save();
  res.redirect('/');
});

router.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await mongod.findOne({
    username,
    password
  });
  if(user){
    return  res.render('index',{user});
  }
  else{
    return res.render('login',{ message: 'Email or Password incorrect'});
  }
  res.redirect('/');
});

module.exports = router;
