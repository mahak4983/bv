const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const path = require("path");

const user = require('./routes/user');
const {MONGOURI} = process.env.MONGOURI

const PORT = process.env.PORT || 8080
const app = express();
app.use(cors());

// Parse the json body
app.use(express.json());
// Parse url encoded form data
app.use(express.urlencoded({ extended: true }));

// HOOK the end-points for the routes

app.use('/api/v1/user', user);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, "./client/build")));

    app.get("*", function (req, res) {
        res.sendFile(
            path.join(__dirname, "./client/build/index.html"),
            function (err) {
                res.status(500).send(err);
            }
        );
    });
}



// Connect to mongodb

mongoose
    .connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        // start the App server
        console.log('connected to mongodb...');
        app.listen(PORT, () => console.log(`Listening on port 8080`));
    })
    .catch((err) => {
        // If not connected, exit the process
        console.log('Error while connecting to mongodb: ', err);
        process.exit(1);
    });


