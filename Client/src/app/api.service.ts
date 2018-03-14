import { Injectable } from '@angular/core';
// import Http and response
import {Http, Response} from '@angular/http';
// import observable from reactjs
import { Observable } from 'rxjs/Observable';
// map 
import 'rxjs/add/operator/map'
//Import the Applicant class from data-modules
import { IApplicant } from './data-modules/applicant';


@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  getApplicants(): Observable<IApplicant[]> {
    var url = "http://localhost:3000/api/getApplicants";
    var res: Observable<IApplicant[]> =
    this._http.get(url)
      .map((response: Response) => <IApplicant[]>response.json());
    return res;
  }

}



