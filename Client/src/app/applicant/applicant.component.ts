import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  jobID : String;
  constructor(
    private service: ApiService, 
    private route: Router,
    private activRoute : ActivatedRoute 
  ) { }

  ngOnInit() {
    this.activRoute.params.subscribe((params)=> { 
      this.jobID = params['jobID'];
      if(this.jobID != null)
      {
        this.service.matchApplicants(this.jobID)
                .subscribe((applicantData)=>this.applicants = applicantData);
      }
      else
      {
        this.service.getApplicants()
                .subscribe((applicantData)=>this.applicants = applicantData);
      }
    });        
  }
  addApplicant(): void{
   this.route.navigate(['/addApplicant']);
  }
}
