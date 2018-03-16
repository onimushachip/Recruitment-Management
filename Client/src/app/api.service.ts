import { Injectable, Input } from '@angular/core';
// import Http and response
import {Http, Response, RequestOptions} from '@angular/http';
// import observable from reactjs
import { Observable } from 'rxjs/Observable';
// map 
import 'rxjs/add/operator/map'
//Import the Applicant class from data-modules
import { IApplicant, NewApplicant } from './data-modules/applicant';
//Import the JobInfo class from data-modules
import { IJobInfo, JobPosting } from './data-modules/job';
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

  //Keeping track of the user's first, last names
  private userFirstName: String = "";
  private userLastName: String = "";

  constructor(
    private _http: Http,
    private httpClient: HttpClient
  ) { }

  // get applicants -Thierno
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
  // insert Applicant -Thierno
  insertApplicant(applicant: NewApplicant): Observable <IApplicant>
  {
    var url = ROOTIP+"/api/addApplicant/";
    var res: Observable<IApplicant> = this._http.post(url, applicant)
    .map((response: Response) => <IApplicant> response.json()); 
    return res;
  }
  // get applicant by id -Thierno
  getApplicant(id:number): Observable<IApplicant>{
    var url = ROOTIP+"/api/getApplicant/"+id;
    var res: Observable<IApplicant> =
    this._http.get(url)
      .map((response: Response) => <IApplicant>response.json());
    return res;
  }

  //Delelect Applicant - Thierno
  deleteApplicant(id:number, userId:String):Observable<IApplicant>{
    var url = ROOTIP+"/api/removeApplicant";
    let headers = new Headers(
      { 'Content-Type': 'application/json' }
    );
    let options = new RequestOptions(
      {
        headers: headers,
        body:{
          _applicantId: id,
          recruiterUserId: userId
        }
      }
    ); // auto from http
    var res: Observable<IApplicant> =
    this._http.delete(url, options)
      .map((response: Response) => <IApplicant>response.json());
    return res;
  }
  //Update applicant -Thierno
  updateApplicant(applicant: IApplicant): Observable<IApplicant>{
    var url = ROOTIP+"/api/updateApplicant/"+applicant._applicantId;
    return this.httpClient.put<IApplicant>(url, applicant, httpOptions);
  }

  getJobInfo(id:String): Observable<IJobInfo> {
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
  //delete a job based on id
  deleteJob(id : String)
  {
    var url = ROOTIP+"/api/deleteJobPosting/";
  }

  //search applicant by firstName
  getApplicantsFirstName(firstN:String): Observable<IApplicant[]> {
    var url = ROOTIP+"/api/applicants/searchFirstName/"+firstN;
    var res: Observable<IApplicant[]> =
    this._http.get(url)
      .map((response: Response) => <IApplicant[]>response.json());
    return res;
  }

  //search applicant by lastName
  getApplicantsLastName(firstL:String): Observable<IApplicant[]> {
    var url = ROOTIP+"/api/applicants/searchLastName/"+firstL;
    var res: Observable<IApplicant[]> =
    this._http.get(url)
      .map((response: Response) => <IApplicant[]>response.json());
    return res;
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

  //Check to see if the user logged is a recruiter - Lam Nguyen
  checkRecruiterType(): boolean {
    return (this.userType === RECRUITERTYPE);
  }

  //Check to see if the user logged is a Manager - Lam Nguyen
  checkManagerType(): boolean {
    return (this.userType === MANAGERTYPE);
  }

  //Setter for username - Lam Nguyen
  setUsername(input: String): void {
    this.username = input; 
  }

  //Getter for username - Lam Nguyen
  getUsername(): String {
    return this.username;
  }

  //Setters for the user's first, last names - Lam Nguyen
  setUserFirstname(input: String): void {
    this.userFirstName = input;
  } 

  setUserLastName(input: String): void {
    this.userLastName = input;
  }

  //Getters for the user's first, last names - Lam Nguyen
  getUserFirstName(): String {
    return this.userFirstName;
  }

  getUserLastName(): String {
    return this.userLastName;
  }

  //Fetch one user from the server - Lam Nguyen
  getOneUser(userId: String): Observable<User> {
    var apiUrl = ROOTIP + "/api/getUserById/" + userId;

    return this.httpClient.get<User>(apiUrl);
  }

  //Create one User - Lam Nguyen
  createOneUser(input: User): Observable<User> {
    var apiUrl = ROOTIP + "/api/addUserInfo";

    return this.httpClient.post<User>(apiUrl, input, httpOptions);
  }

  //Create one Job Posting - Lam Nguyen
  createOneJobPosting(input: JobPosting): Observable<JobPosting> {
    var apiUrl = ROOTIP + "/api/addJobPosting";

    return this.httpClient.post<JobPosting>(apiUrl, input, httpOptions);
  }
}



