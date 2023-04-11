const oauthRouter = express.Router();
dotenv.config();
const client_id = process.env.CLIENT_ID

oauthRouter.get('/', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}`
  );
});

oauthRouter.get(
  '/token',
  oauthController.exchangeCode,
  (req, res) => {
    
  }
)