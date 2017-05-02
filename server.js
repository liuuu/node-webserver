const express = require('express');
const hbs = require('hbs');

const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
  var now = Date.now();
  var log = `${req.method}${req.url}`
  console.log(log);
  fs.appendFile('server.log', log, (err) => { if(err){console.log(err);}})
  next();
})

// express middleware to always to render
// app.use((req, res, next) => {
//   res.render('maintenace.hbs');
// })

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getYear', () => {
  return new Date().getFullYear() + 'hahah';
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    welcomeMessage: 'Welcome'

  });
})

app.listen(port, () => {
  console.log('server is up on port 3000');
});
