import allRoutes from "./userApi.js"

const constructorMethod = (app) => {
  app.use('/sweets', allRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

export default constructorMethod;