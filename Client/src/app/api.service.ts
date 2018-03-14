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


@Injectable()
export class ApiService {
private readonly ROOTIP: String = "http://localhost:3000";
  constructor(private _http: Http) { }

  getApplicants(): Observable<IApplicant[]> {
    var url = this.ROOTIP+"/api/getApplicants";
    var res: Observable<IApplicant[]> =
    this._http.get(url)
      .map((response: Response) => <IApplicant[]>response.json());
    return res;
  }
  getJobInfo(id:String): Observable<IJobInfo> {
    var url = this.ROOTIP+"/api/getJobById/"+id;
    var res: Observable<IJobInfo> =
    this._http.get(url)
      .map((response: Response) => <IJobInfo>response.json());
    return res;
  }
  getJobs(): Observable<IJobInfo[]> {
    var url = this.ROOTIP+"/api/getJobs/";
    var res: Observable<IJobInfo[]> =
    this._http.get(url)
      .map((response: Response) => <IJobInfo[]>response.json());
    return res;
  }

}



