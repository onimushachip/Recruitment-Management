import { Injectable } from '@angular/core';
// import Http and response
import {Http, Response} from '@angular/http';
// import observable from reactjs
import { Observable } from 'rxjs/Observable';
// map 
import 'rxjs/add/operator/map'
//Import the Applicant class from data-modules
import { IApplicant } from './data-modules/applicant';
//Import the JobInfo class from data-modules
import { IJobInfo } from './data-modules/job';
//Import the User class
import { User } from './data-modules/User';

//Import the Http Modules according to Angular Official Guide
import { HttpClient, HttpHeaders } from '@angular/common/http'; //
import { catchError, map, tap } from 'rxjs/operators'; //
import { Headers } from '@angular/http'; //

//The IP of the API server will be supplied here
const ROOTIP: String = "http://localhost:3000";

//Specifying the headers for the server to recognize JSON body request
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//Defining the types of users
const MANAGERTYPE: String = "Manager";
const RECRUITERTYPE: String = "Recruiter";

@Injectable()
export class ApiService {
  //Keeping track of the login status
  private checkLogin: boolean = false;

  //Keeping track of the User Type
  private userType: String = "";

  //Keeping track of username
  private username: String = "";

  constructor(
    private _http: Http,
    private httpClient: HttpClient
  ) { }

  getApplicants(): Observable<IApplicant[]> {
    var url = ROOTIP+"/api/getApplicants";
    var res: Observable<IApplicant[]> =
    this._http.get(url)
      .map((response: Response) => <IApplicant[]>response.json());
    return res;
  }
  //get Job By id -Andrew
  getJobById(id:String): Observable<IJobInfo> {
    var url = ROOTIP+"/api/getJobById/"+id;
    var res: Observable<IJobInfo> =
    this._http.get(url)
      .map((response: Response) => <IJobInfo>response.json());
    return res;
  }
  //get Job By title -Andrew
  getJobsByTitle(title:String): Observable<IJobInfo[]> {
    var url = ROOTIP+"/api/getJobsByTitle/"+title;
    var res: Observable<IJobInfo[]> =
    this._http.get(url)
      .map((response: Response) => <IJobInfo[]>response.json());
    return res;
  }
  //get all Jobs - Andrew
  getJobs(): Observable<IJobInfo[]> {
    var url = ROOTIP+"/api/getJobs/";
    var res: Observable<IJobInfo[]> =
    this._http.get(url)
      .map((response: Response) => <IJobInfo[]>response.json());
    return res;
  }
  //update a job(jobCode dependent) takes an IJobInfo object - Andrew
  updateJob(job : IJobInfo): Observable<IJobInfo>
  {
    var url = ROOTIP+"/api/jobPosting/"+job._jobCode;
    var res: Observable<IJobInfo> = this._http.put(url, job)
      .map((response : Response) => <IJobInfo>response.json());
    return res;
  }

  getApplicantsFirstName(firstN){
    return this._http.get('http://localhost:3000/api/applicants/searchFirstName/' + firstN)
        .map(res => res.json());
  }

  getApplicantsLastName(firstL){
    return this._http.get('http://localhost:3000/api/applicants/searchLastName/' + firstL)
        .map(res => res.json());
  }

  //Setter for Login Status -- Lam Nguyen
  flagLogin() {
    this.checkLogin = true;
  }

  flagLogout() {
    this.checkLogin = false;
  }

  //Getter for Login Status -- Lam Nguyen
  checkLoginStatus(): boolean {
    return this.checkLogin;
  }

  flagRecruiterType(): void {
    this.userType = "Recruiter";
  }

  flagManagerType(): void {
    this.userType = "Manager";
  }

  getUserType(): String {
    return this.userType;
  }

  //Check to see if the user logged is a recruiter -- Lam Nguyen
  checkRecruiterType(): boolean {
    return (this.userType === RECRUITERTYPE);
  }

  //Check to see if the user logged is a Manager -- Lam Nguyen
  checkManagerType(): boolean {
    return (this.userType === MANAGERTYPE);
  }

  //Setter for username -- Lam Nguyen
  setUsername(input: String): void {
    this.username = input; 
  }

  //Getter for username -- Lam Nguyen
  getUsername(): String {
    return this.username;
  }

  //Fetch one user from the server -- Lam Nguyen
  getOneUser(userId: String): Observable<User> {
    var apiUrl = ROOTIP + "/api/getUserById/" + userId;

    return this.httpClient.get<User>(apiUrl);
  }

  //Create One User -- Lam Nguyen
  createOneUser(input: User): Observable<User> {
    var apiUrl = ROOTIP + "/api/addUserInfo";

    return this.httpClient.post<User>(apiUrl, input, httpOptions);
  }

}



