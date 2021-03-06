// Entry file for PatrickDoran.com Node application, using Express

// Required External Modules
const express = require("express");
const path = require("path");

// App Variables

const app = express();
const port = process.env.PORT || "8000";



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
        yearsLive: yearToday - yearSince // Returns the number of years the site has been live.
      });
 });

// app.get("/", (req, res) => {
//     res.status(200).send("WHATABYTE: Food For Devs");
//   });

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});