const app = require('./app');

const port = process.env.PORT || 3200;
app.listen(port, () => {
  app.use(express.static('public'));
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
