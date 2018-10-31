const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const path = require('path');
const port = 3800;
const app = express();
const partialURL = path.join(__dirname, '/', 'views/partials');
const publicURL = path.join(__dirname, '/', '/public');

hbs.registerPartials(partialURL);
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);// es
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(publicURL));

hbs.registerHelper('getyear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamit', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Nyto\'s WebSite',
  });
});

app.get('/about', (req, res) => {
  // res.send('<h3>About Page!</h3>');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fullfil request!'
  });
});

app.listen(port);
