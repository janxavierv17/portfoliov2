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


// Directs users to the homepage (index)
app.get("/", (request, response) => {
    response.locals.projects = projects
    response.render("index")
})
// Directs users to the about page
app.get("/about", (request, response) => {
    response.render("about")
})
// Directs user to a specific project which contains more information about the web application.
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


// An 404 not found error message that will be diplayed in page-not-found template
app.use((request, response, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

// This error middleware will take care of the app whenever an error either 500 (internal server) or 400 (file not found) occurs.
// If a 404 status occurs page-not-found template will render with its appropriate messages)
// If a 500 status occurs it will display a 500 status and a message with a formatted stack trace message
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

// My app will run in localhost:3000
app.listen(3000, () => { console.log("App.js is running in localhost:3000") })