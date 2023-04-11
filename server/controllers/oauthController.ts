dotenv.config();

const client_secret = process.env.CLIENT_SECRET;

interface oauthController {
  exchangeCode: Function,
  getUserDetails: Function
}

const oauthController: oauthController = {

  exchangeCode: (req, res, next) => {
    const { code } = req.query;
    const body =JSON.stringify({ client_id, client_secret, code });
    const headers = { accept: 'application/json' };

    fetch('https://github.com/login/oauth/access_token',
      { method: 'POST', headers, body }
    )
      .then(response => response.json())
      .then(response => {
        res.locals.token = response.data['access_token'];
        return next();
      })
      .catch(err => {
        return next({
          log: 'error in oauthController.exchangeCode --> POST',
          status: 500,
          message: {err}
        });
      });
  },

  getUserDetails: (req, res, next) => {
    fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${res.lcoals.token}` },
    })
      .then(response => response.json())
      .then(response => {
        const { login } = response.data;
        models.User.findOne({ username: login })
          .then(user => {
            if (!user) {
              // user doesn't exist, so:
              const newUser = new models.User({
                username: login,
              });
              newUser
                .save()
                .then(user => {
                  res.locals.user = user;
                  return next();
                })
                .catch(err => {
                  return next({
                    log: 'Error in getUserDetails --> new User.save',
                    status: 500,
                    message: {err}
                  });
                });
            } else {
              // user already exists
              res.locals.user = user;
              return next();
            }
          })
          .catch(err => {
            return next({
              log: 'error in getUserDetails --> User.findOne',
              status: 500,
              message: {err}
            });
          });
      })
      .catch(err => {
        return next({
          log: 'Error in getUserDetails --> fetch',
          status: 500,
          message: {err}
        });
      });
  }
}

module.exports = oauthController;