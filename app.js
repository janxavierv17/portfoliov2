// Require JSON data with ES6 Destructuring
let { data } = require("./data/data.json")
let { projects } = data

const express = require("express");
const { response } = require("express");
const app = express();
//Express body parser
app.use(express.urlencoded({ extended: false }))
app.use("/static", express.static("public"))
app.set("view engine", "pug")



app.get("/", (request, response) => {
    response.locals.projects = projects
    response.render("index")
})

app.get("/about", (request, response) => {
    response.render("about")
})

app.get("/projects/:id", (request, response) => {
    // Take the id of the selected project.
    let { id } = request.params

    // Access title, description, array of technologies & photos from the data.
    let title = projects[id].project_name
    let description = projects[id].description
    let technologies = projects[id].technologies
    let images = projects[id].image_urls
    let liveLink = projects[id].live_link
    let gitHub = projects[id].github_link

    // ES6 Destructuring of data local to this request
    response.render("project", { title, description, technologies, images, liveLink, gitHub })
})

app.use((request, response, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, request, response, next) => {
    response.locals.error = error;
    if (error.status === 404) {
        let error400 = error.status
        response.status(error400)
        response.render("page-not-found")
    } else {
        error.status = 500
        let error500 = error.status
        response.status(error500)
        response.render("error")
    }
})


app.listen(3000, () => { console.log("App.js is running in localhost:3000") })