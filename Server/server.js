// imports
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connecting to mongoDB server
mongoose.connect("mongoDB://localhost/recruitmentDB");

// Using Body-Parser to get data from requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Enable CORS and request methods
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	next();
});

// Creating UserInfo Schema
var userInfo = mongoose.model("UserInfo", mongoose.Schema({
    _userId: String,
    password: String,
    email: String,
    userType: String,
    firstName: String,
    lastName: String
}));

// Creating JobPostinfInfo Schema
var jobPostingInfo = mongoose.model("JobPostingInfo", mongoose.Schema({
    _jobCode: String,
    jobTitle: String,
    recruiterUserId: String,
    approval: String,
    exprience: String,
    skills: []
}));

//Creating Applicant Schema
var applicant = mongoose.model("Applicant", mongoose.Schema({
    _applicantId: String,
    firstName: String,
    lastName: String,
    email: String,
    experience: String,
    skills: [],
    recruiterUserId: String
}));

// Testing function to create the database using a POST request
app.post("/api/createDatabase", function(req, res) {
    console.log(req.body);
    var newUser = {
        "_userId" : "12345",
        "password" : "avcxs",
        "email" : "abc@def.com",
        "userType" : "Manager",
        "firstName" : "New",
        "lastName" : "Guy"
    };
    var newJobPost = {
        "_jobCode" : "JAR-112",
        "jobTitle" : "Java Tester",
        "recruiterUserId" : "00000",
        "approval" : "No",
        "experience" : "2 years",
        "skills" : ["Java", "SQL"]
    }
    userInfo.create(newUser, function(err, user) {
        if(err)
            res.send(err);
        console.log("test function checked!");    
    });
    jobPostingInfo.create(newJobPost, function(err, jobPost) {
        if (err)
            res.send(err);
        console.log("test2 function checked!");
    });
    res.send("req completed!");
});

//Start the API server
app.listen(3000, function() {
    console.log("Recruitment Server is up!!!");
});