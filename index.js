const express = require('express');
const path = require('node:path');
const invRouter = require('./routes/invRouter');
const customNotFoundError = require('./errors/customNotFoundError');
const app = express();
const PORT = 3000;
const assetPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetPath));

app.use('/', invRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Now listening to Port ${PORT}`);
});
