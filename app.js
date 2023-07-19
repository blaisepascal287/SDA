const dotenv = require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const MONGODB_URL = process.env;
const mongoose = require('mongoose');
const PORT = 80;
require("./database").connect();

// console.log(MONGODB_URL);
// mongoose.set("strictQuery", false);
// mongoose.connect('MONGODB_URL', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Define mongoose schema
// var contactSchema = new mongoose.Schema({
//     name: String,
//     phone: String,
//     email: String,
//     address: String,
//     desc: String
// });
// //model for schema
// var Contact = mongoose.model('Contact', contactSchema);

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) =>{
    const params = {};
    res.status(200).render('home.pug', params);
});


app.get('/services', (req, res) =>{
    const params = {};
    res.status(200).render('services.pug', params);
});

app.get('/about', (req, res) =>{
    const params = {};
    res.status(200).render('about.pug', params);
});

app.get('/class', (req, res) =>{
    const params = {};
    res.status(200).render('class.pug', params);
});

app.get('/contact', (req, res) =>{
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) =>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your Response has been recorded, you will be contacted soon.");
    }).catch(()=>{
        res.status(400).send("Please Try Again, Later.");
    });
});

// START THE SERVER
app.listen({ port: PORT }, ()=>{
    console.log(`The application is running on port ${PORT}`);
});
