const generateMessage = (origin, text) => {
  return {
    origin,
    text,
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage };
