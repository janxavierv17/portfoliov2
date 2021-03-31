const express = require("express")
const app = express();
app.use("/static", express.static("public"))
app.set("view engine", "pug")



app.get("/", (request, response) => {
    response.render("index")
})
app.listen(3000, () => { console.log("App.js is running in localhost:3000") })