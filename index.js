const express = require('express');
const path = require('node:path');
const express = require('express');
const invRouter = require('./routes/invRouter');
const customNotFoundError = require('./errors/customNotFoundError');
const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', invRouter);

app.use((req, res, next) => {
  throw new customNotFoundError('Page not found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).sebd(err.message);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Now listening to Port ${PORT}`);
});
