const mongoose = require('mongoose');
const config = require('../config');

async function connection() {
  mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connection;