const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express');
const { createServer } = require('vite');
const { create } = require('domain');
const models = require('./models');
const cookieParser = require('cookie-parser');
const feedbackRouter = require('./routes/feedbackRouter');
const oauthRouter = require('./routes/oauthRouter');


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
      console.log(error)
      // vite.ssrFixStacktrace(error);
      res.status(500).send();
      return next(error);
    }
  })

app.use((err, req, res, next) => {
  console.log(`Error: ${err}`);
  const standardError = {
    log: 'There is an unknown middleware error.',
    status: 500,
    message: {error: err}
  };
  return Object.assign(standardError, err);
});

  app.listen(8080, () => {
    console.log('The server is listening at port 8080.');
  });
}

launchServer();



// // wild card handler
// app.use('*', (req: Request, res: Response, next: NextFunction) => {
//   return res.status(404).send('Page not found.');
// });

// // global error handling
// app.use((err: Object, req: Request, res: Response, next: NextFunction) => {
//   console.log(`Error: ${err}`);
//   const standardError = {
//     log: 'There is an unknown middleware error.',
//     status: 500,
//     message: {error: err}
//   };
//   return Object.assign(standardError, err);
// });