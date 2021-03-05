var express = require('express');
var router = express.Router();
var mongod = require('./mongod');
var bcrypt = require('bcrypt');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  if (!name || !username || !password){
    return res.render('register', { message: 'Please try agin'});
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new mongod({ 
    name, 
    username, 
    password: passwordHash});

  await user.save();
  res.render('index', { username });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password){
    return res.render('login', { message: 'Please try again' });
  }
  const user = await mongod.findOne({
    username
  });

  if(user){
    const isCorrect = bcrypt.compareSync(password, user.password);

    if (isCorrect){
      return res.render('index',{ user });
    }
    else{
      return res.render('login', { message: 'Username or Password incorect' });
    }
    
  }
  else{
    return res.render('login',{ message: 'Username dose not exist.'});
  }
});

module.exports = router;
