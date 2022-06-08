const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants,
  storeRestaurants
};