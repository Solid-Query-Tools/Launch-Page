// NEED TO:
// npm i -D typescript @types/express @types/node

const express = require('express');
const app = express();
const PORT = 3000;

// handle parsing request body
app.use(express.json());



// wild card handler
app.use('*', (req, res, next) => {
  return res.status(404).send('Page not found.');
});

// global error handling
app.use((err, req, res, next) => {
  console.log(`Error: ${err}`);
  const standardError = {
    log: 'There is an unknown middleware error.',
    status: 500,
    message: {error: err}
  };
  return Object.assign(standardError, err);
});


// start the server
app.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}...`);
});