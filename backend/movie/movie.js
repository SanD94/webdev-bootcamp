var express = require('express'),
  app = express(),
  axios = require('axios');

// Default Config
axios.defaults.baseURL = 'http://www.omdbapi.com';
axios.defaults.params = { apikey: 'thewdb' };

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('search'));

app.get('/results', (req, res) => {
  var { search } = req.query;
  axios.get('/', { params : { s: search }})
    .then((response) => {
      var { data } = response;
      res.render('results', { data });
    })
    .catch((err) => res.send(err));
});

app.listen(3000, () => console.log('Movie app has started!!!'));
