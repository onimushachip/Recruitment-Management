export class User {
  _id : String;
  _userId : String;
  password : String;
  email : String;
  firstName : String;
  lastName : String;
  userType : String;
}

export class UserStats{
  _userId : String;
  numJobs: number;
  approved: number;
  denied: number;
  waiting: number;
}