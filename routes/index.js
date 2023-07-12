const userApiData = require('./userApi');

const constructorMethod = (app) => {
  app.use('/sweets', userApiData);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;