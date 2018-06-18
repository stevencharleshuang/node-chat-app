const generateMessage = (origin, text) => {
  return {
    origin,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMessage = (origin, lat, long) => {
  return {
    origin,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage, generateLocationMessage };
