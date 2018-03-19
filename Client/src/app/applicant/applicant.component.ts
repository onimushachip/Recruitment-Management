import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import { IApplicant } from '../data-modules/applicant';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  applicants: IApplicant [];
  private query: String = "";
  private option: String = "";
  constructor(
    private service: ApiService, 
    private route: Router 
  ) { }

  ngOnInit() {
    this.service.getApplicants()
                .subscribe((applicantData)=>this.applicants = applicantData);

  }
  addApplicant(): void{
   this.route.navigate(['/addApplicant']);
  }
  search()
  {
    if(this.query != "")
    {
      console.log(this.query);
      console.log(this.option);
      if(this.option === "FirstName")
        this.service.getApplicantsFirstName(this.query)
        .subscribe((data) => {this.applicants = data; console.log(data);});
      else if(this.option === "LastName")
        this.service.getApplicantsLastName(this.query)
        .subscribe((data) => {this.applicants = data;});
    }
    else
    {
      console.log("eLSE");
      this.service.getApplicants()
      .subscribe((applicantData)=>this.applicants = applicantData);
    }
  }
}
