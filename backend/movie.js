var express = require('express'),
  app = express(),
  axios = require('axios');

// Default Config
axios.defaults.baseURL = 'http://www.omdbapi.com/?apikey=thewdb&';

app.get('/results', (req, res) => {
  axios.get('s=california').then((response) => {
    res.send(response.data);
  });
});

app.listen(3000, () => console.log('Movie app has started!!!'));
