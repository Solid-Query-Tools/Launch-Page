const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express');
const { createServer } = require('vite');
const { create } = require('domain');


async function launchServer() {
  const app = express();

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(vite.middlewares);

  app.post('/submitfeedback', async (req, res, next) => {
    
  })

  app.use('/', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // read index.html
      let static = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8',
      )

      // apply Vite HTML transforms
      static = await vite.transformIndexHtml(url, static);

      // send back rendered HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).end(static);
      
    } catch(error) {
      console.log(error)
      vite.ssrFixStacktrace(error);
      return next(error);
    }
  })

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