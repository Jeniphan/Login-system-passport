const mongoose = require('mongoose');


mongoose.connect('mongodb://192.168.0.106:27017/login-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});