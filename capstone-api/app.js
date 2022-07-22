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

const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(morgan("tiny"))
app.use(express.json())

/** This route does not require authentication to access, (based on our design of the WebApplication)
 * 
 * Therefore it should be placed above the authentication
 * */
app.use("/search", searchRoutes)

app.use(security.extractUserFromJwt)

app.use("/recipe", recipeRoutes)
app.use("/auth", authRoutes)
app.use("/review", reviewRoutes)
app.use("/savedrecipe", savedrecipeRoutes)
app.use("/mealplanner", mealplannerRoutes)
app.use("/follow", followRoutes)

app.get("/",(req, res, next) => {
    res.status(200).json({"ping":"pong"})
})

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