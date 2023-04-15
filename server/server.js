const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer } = require('vite');
const cookieParser = require('cookie-parser');
const feedbackRouter = require('./routes/feedbackRouter');
const oauthRouter = require('./routes/oauthRouter');
const userRouter = require('./routes/userRouter');
const sessionRouter = require('./routes/sessionRouter');


async function launchServer() {
  const app = express();

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(vite.middlewares);

  //parse request body and cookies:
  app.use(express.json());
  app.use(cookieParser());

  // route feedback requests
  app.use('/fb', feedbackRouter);

  // route oauth requests
  app.use('/oauth', oauthRouter);

  // route user requests
  app.use('/user', userRouter);

  // route session requests
  app.use('/session', sessionRouter);

  app.use('/', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // read index.html
      let staticFiles = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8',
      )

      // apply Vite HTML transforms
      staticFiles = await vite.transformIndexHtml(url, staticFiles);

      // send back rendered HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).send(staticFiles);

    } catch (error) {
      res.status(500).send();
      return next(error);
    }
  })

  // global error handler
  app.use((err, req, res, next) => {
    console.log(`Error in global error handler: ${JSON.stringify(err)}`);
    const standardError = {
      log: 'There is an unknown middleware error.',
      status: 500,
      message: {error: JSON.stringify(err)}
    };
    return Object.assign(standardError, err);
  });

  app.listen(8080, () => {
    console.log('The server is listening at port 8080.');
  });
}

launchServer();