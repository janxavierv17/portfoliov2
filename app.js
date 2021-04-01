// Require JSON data with ES6 Destructuring
let { data } = require("./data/data.json")
let { projects } = data
const express = require("express")
const app = express();
//Express body parser
app.use(express.urlencoded({ extended: false }))
app.use("/static", express.static("public"))
app.set("view engine", "pug")



app.get("/", (request, response) => {
    response.locals.projects = projects
    response.render("index", projects)
})

app.get("/about", (request, response) => {

    response.render("about")
})
app.listen(3000, () => { console.log("App.js is running in localhost:3000") })