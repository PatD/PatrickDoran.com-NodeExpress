// Entry file for PatrickDoran.com Node application, using Express

// Required External Modules
const express = require("express");
const path = require("path");
const fs = require('fs');

// App Variables

const app = express();
const port = process.env.PORT || "8000";


// Get JSON file for projects

let projects;
fs.readFile('projects.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        const loadedProjects = JSON.parse(data);

        // Create a new attribute that's the title but hyphens instead of spaces.
        loadedProjects.forEach(element => {
            element.titleURL = element.Title.replace(/\s/g,"-")
        });

        projects = loadedProjects
    }
});






// Stuff is in the /views folder
app.set("views", path.join(__dirname, "views"));

// Using PUG for templating
app.set("view engine", "pug");

// Output to the /public folder
app.use(express.static(path.join(__dirname, "public")));


/**
 * Routes Definitions
 */

// Homepage gets a view called home
app.get("/", (req, res) => {
    
    // Year PatrickDoran.com domain was registered
    var yearSince = 2004
    
    // The current year
    var yearToday = new Date().getFullYear()
 


    res.render("home", { 
        title: "Patrick Doran is a Developer & Interaction Designer in North Carolina.", 
        yearSince: yearSince,
        yearsLive: yearToday - yearSince, // Returns the number of years the site has been live.
        projects: projects
      });
 });

// app.get("/", (req, res) => {
//     res.status(200).send("WHATABYTE: Food For Devs");
//   });


// Homepage gets a view called home
app.get("/writing", (req, res) => {

    res.render("writing", { 
        title: "Patrick Doran is writes for the users."
      });
 });





app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});