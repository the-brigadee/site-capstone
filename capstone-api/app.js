const express = require("express")
const {BadRequestError, NotFoundError} = require("./utils/errors")
const security=require("./middleware/security")
const authRoutes = require("./routes/auth")
const recipeRoutes = require("./routes/recipe")
const reviewRoutes = require("./routes/review")
const savedrecipeRoutes = require("./routes/savedrecipe")
const mealplannerRoutes = require("./routes/mealplanner")
const followRoutes = require("./routes/follow")
const searchRoutes = require("./routes/search")
const profileRoutes = require("./routes/profile")
const bodyParser = require('body-parser');
const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER} = require("./config")
const client = require('twilio')(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
);

const morgan = require("morgan")
const cors = require("cors")
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.use(morgan("tiny"))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use(security.extractUserFromJwt)


app.use("/search", searchRoutes)
app.use("/profile", profileRoutes)
app.use("/recipe", recipeRoutes)
app.use("/auth", authRoutes)
app.use("/review", reviewRoutes)
app.use("/savedrecipe", savedrecipeRoutes)
app.use("/mealplanner", mealplannerRoutes)
app.use("/follow", followRoutes)

app.get("/",(req, res, next) => {
    res.status(200).json({"ping":"pong"})
})

app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    console.log(req.body.creds);
    // console.log(res);
    client.messages
      .create({
        from: TWILIO_PHONE_NUMBER,
        to: req.body.creds.to,
        body: req.body.creds.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });

app.use((req, res, next) => {
    next(new NotFoundError())
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status },
    })
})


module.exports=app