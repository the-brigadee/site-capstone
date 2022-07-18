const {PORT} = require("./config")
const app=require("./app")

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ` + PORT)
})