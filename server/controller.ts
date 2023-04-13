models = require('./models.ts');

module.exports = {
  getFeedback: async (req, res, next) => {
    console.log('hit')
    try {
      const feedback = await models.Feedback.find({}).exec();
      res.locals.feedback = feedback;
      console.log(res.locals.feedback)
      return next();
    }

    catch {
      console.log('issue')
    }
  }
}