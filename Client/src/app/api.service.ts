import { Injectable } from '@angular/core';
// import Http and response
import {Http, Response} from '@angular/http';
// import observable from reactjs
import { Observable } from 'rxjs/Observable';
// map 
import 'rxjs/add/operator/map'
//Import the Applicant class from data-modules
import { IApplicant, NewApplicant } from './data-modules/applicant';
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

@Injectable()
export class ApiService {
  //Keeping track of the login status
  private checkLogin: boolean = false;

  constructor(
    private _http: Http,
    private httpClient: HttpClient
  ) { }

  // get applicants 
  getApplicants(): Observable<IApplicant[]> {
    var url = ROOTIP+"/api/getApplicants";
    var res: Observable<IApplicant[]> =
    this._http.get(url)
      .map((response: Response) => <IApplicant[]>response.json());
    return res;
  }
  // insert Applicant
  insertApplicant(applicant: NewApplicant): Observable <IApplicant>
  {
    var url = ROOTIP+"/api/addApplicant/";
    var res: Observable<IApplicant> = this._http.post(url, applicant)
    .map((response: Response) => <IApplicant> response.json()); 
    return res;
  }
  // get applicant by id
  getApplicant(id:number): Observable<IApplicant>{
    var url = ROOTIP+"/api/getApplicant/"+id;
    var res: Observable<IApplicant> =
    this._http.get(url)
      .map((response: Response) => <IApplicant>response.json());
    return res;
  }

  getJobInfo(id:String): Observable<IJobInfo> {
    var url = ROOTIP+"/api/getJobById/"+id;
    var res: Observable<IJobInfo> =
    this._http.get(url)
      .map((response: Response) => <IJobInfo>response.json());
    return res;
  }

  getJobs(): Observable<IJobInfo[]> {
    var url = ROOTIP+"/api/getJobs/";
    var res: Observable<IJobInfo[]> =
    this._http.get(url)
      .map((response: Response) => <IJobInfo[]>response.json());
    return res;
  }

  updateJob(job : IJobInfo): Observable<IJobInfo>
  {
    var url = ROOTIP+"/api/jobPosting"+job._jobCode;
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

  //Setter for Login Status
  flagLogin() {
    this.checkLogin = true;
  }

  //Getter for Login Status
  checkLoginStatus(): boolean {
    return this.checkLogin;
  }

  //add a parameter to get usernames
  getOneUser(userId: String): Observable<User> {
    var apiUrl = ROOTIP + "/api/getUserById/" + userId;

    return this.httpClient.get<User>(apiUrl);
  }

}



