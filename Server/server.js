//import JS Frameworks
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// for auto-increment Applicant Id
var autoIncrement = require('mongoose-auto-increment');

// Connecting to mongoDB server
var connection = mongoose.createConnection("mongoDB://localhost/recruitmentDB");

//Initialize auto-incrementation counter
autoIncrement.initialize(connection);


//Using Body-Parser to get data from requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Enable CORS and request methods
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	next();
});

// Creating UserInfo Schema
var userInfo = connection.model("UserInfo", Schema({
    _id: String,
    _userId: String,
    password: String,
    email: String,
    userType: String,
    firstName: String,
    lastName: String
},
{
    _id: false
}));

// Creating JobPostinfInfo Schema
var jobPostingInfo = connection.model("JobPostingInfo", Schema({
    _id: String,
    _jobCode: String,
    jobTitle: String,
    recruiterUserId: String,
    approval: String,
    exprience: String,
    skills: []
},
{
    _id: false
}));

//Creating Applicant Schema
var applicantSchema = new Schema({
    _applicantId: Number,
    firstName: String,
    lastName: String,
    email: String,
    experience: String,
    skills: [],
    recruiterUserId: String
});
var applicant = connection.model("applicant", applicantSchema);
applicantSchema.plugin(autoIncrement.plugin, {
    model: 'applicant',
    field: '_applicantId',
    startAt: 1
});

//Get a user from the userinfo collection - Andrew
app.get('/api/getUserById/:id', function(req, res)
{
    userInfo.findOne({_userId : req.params.id},function(err, user)
    {
        if(err)
        {
            res.send(err);
            return;
        }
        console.log(user);
        res.json(user);
    });
});

//Get list of users from userinfo - Andrew
app.get('/api/getUsers/', function(req,res)
{
    userInfo.find(function(err, user)
    {
        if(err)
        {
            res.send(err);
            return;
        }
        console.log(user);
        res.json(user);
    });
});

//Get 10 job postings by Title - Andrew
app.get('/api/getJobsByTitle/:jobTitle', function(req, res)
{
    jobPostingInfo.find(function(err, jobs)
    {
        if(err)
        {
            res.send(err);
            return;
        }
        var title = req.params.jobTitle;
        var matchingJobs = [];
        numJobs = 0;
        for(i = 0; ((i<jobs.length)&&(numJobs <10));i++)
        {
            if(title.ignoreCase === jobs[i].jobTitle.ignoreCase)
            {
                matchingJobs.push(jobs[i]);
                numJobs++;
            }
        }
        console.log(matchingJobs);
        res.json(matchingJobs);
    });
});

//Add a user to the userinfo collection - Thierno
app.post('/api/addUserInfo', function(req, res){
    userInfo.create(req.body, function(err, usr){
        if (err) {
            res.send(err);
            return;
        }
        console.log(usr);
        res.json(usr);
    });
});

//Add a job Posting to the JobPostinginfo collection - Thierno
app.post('/api/addJobPosting', function(req, res){
    jobPostingInfo.create(req.body, function(err, job){
        if (err) {
            res.send(err);
            return;
        } 
        console.log(job);
        res.json(job);
    });
});

//Add a user to the appicant collection - Isaac
app.post('/api/addApplicant', function(req, res){
    applicant.create(req.body, function(err, appli){
        if (err) {
            res.send(err);
            return;
        }
        console.log(appli);
        res.json(appli);
    });
});

//Testing function to create the database using a POST request - Lam Nguyen
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
        if (err)
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