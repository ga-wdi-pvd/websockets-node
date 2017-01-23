var app = require('express')();

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});
