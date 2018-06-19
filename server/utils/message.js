const moment = require('moment');

const generateMessage = (origin, text) => {
  return {
    origin,
    text,
    createdAt: moment().valueOf()
  };
};

const generateLocationMessage = (origin, lat, long) => {
  return {
    origin,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: moment().valueOf()
  };
};

module.exports = { generateMessage, generateLocationMessage };
