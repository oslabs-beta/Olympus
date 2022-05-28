const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;

//connection URL
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));

const apiRouter = require(path.join(__dirname, './routes/api.js'));

// routes to '/api/'
app.use('/api/', apiRouter);

// error handler for calls to non-existent routes
app.use('*', (req, res) => {
  console.log('Page not found');
  return res.status(404).send('Page not found.');
});

// global error-handler
app.use(defaultErrorHandler);
function defaultErrorHandler(err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
}

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
