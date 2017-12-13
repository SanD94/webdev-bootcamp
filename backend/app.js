var express = require('express');
var app = express();

app.get('/', (req, res) =>
  res.send('Hi there, welcome to my assignment')
);

app.get('/speak/:animal', (req, res) => {
  var sounds = {
    dog: 'Woof Woof!',
    cow: 'Moo',
    pig: 'Oink'
  };

  var animal = req.params.animal.toLowerCase();
  var sound = sounds[animal] || " ";
  res.send('The ' + animal + ' says ' + "'" + sound + "'");
});

app.get('/repeat/:what/:many', (req, res) => {
  var repeat = req.params.what;
  var limit = Number(req.params.many);
  var s = '';
  for (var i = 0; i < limit; ++i) s += repeat + ' ';
  res.send(s);
});


app.get('*', (req, res) =>
  res.send('Sorry, page not found... What are you doing with your life?')
);

app.listen(3000);
