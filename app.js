const express = require('express');
const path = require('path');

const defaultRoutes = require('./routes/default');
const restaurantsRoutes = require('./routes/restaurants');

const app = express();

// options express. Our template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// style and script
app.use(express.static('public'));

// for request
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);

// when isn't page. It will be the end
app.use((req, res) => res.status(404).render('404'));

// when is mistake on the server
app.use((error, req, res, next) => {
  res.status(500).render('500')
})

app.listen(3000);