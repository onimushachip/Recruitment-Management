// imports
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// connecting to mongoDB server

mongoose.connect("mongoDB://localhost/recruitmentDB");

// Creating UserInfo Schema
var userInfo = mongoose.model("UserInfo", mongoose.Schema({
    _userID: String,
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
    _applicantID: String,
    firstName: String,
    lastName: String,
    email: String,
    experience: String,
    skills: [],
    recruiterUserId: String
}));

//Start the API server
app.listen(3000, function() {
    console.log("Recruitment Server is up!!!");
});