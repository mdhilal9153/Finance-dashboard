const express = require('express');
const app = express();
const connectDb = require("./config/db");
const cors = require("cors");

app.use(express.json()) // lets Express read JSON request bodies
app.use(express.urlencoded({ extended: true })) // lets Express read form data
app.use(cors());

connectDb();


app.use('/api/auth',require('./routes/auth'));
app.use('/api/records',require('./routes/records'));
app.use('/api/dashboard',require('./routes/dashboard'));
app.use('/api/admin',require('./routes/admin'));


app.get('/',(req,res) => {
    res.send("Welcome to the API");
});

app.listen(8080, () => {
    console.log("app listening on port 8080");
});