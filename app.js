const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

// helpers functions
const getDataFromJson = () => {
  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

const app = express();

// options express. Our template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// style and script
app.use(express.static('public'));

// for request
app.use(express.urlencoded({ extended: false }));

// GET
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.get('/recommend', (req, res) => {
  res.render('recommend');
});

app.get('/restaurants', (req, res) => {
  const storedRestaurants = getDataFromJson();

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants
  });
});

// dynamic route
app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  const storedRestaurants = getDataFromJson();

  const oneRest = storedRestaurants.find(item => item.id === restaurantId);

  if (oneRest) {
    res.render('restaurant-detail', {
      rid: restaurantId,
      restaurant: oneRest
    });
  }else{
    res.render('404')
  }


});

// POST
app.post('/recommend', (req, res) => {
  const restaurant = req.body;
  // generate id
  restaurant.id = uuid.v4();
  const storedRestaurants = getDataFromJson();

  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect('/confirm');
});

app.listen(3000);