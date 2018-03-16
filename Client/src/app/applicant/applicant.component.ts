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
  constructor(
    public service: ApiService, 
    private route: Router 
  ) { }

  ngOnInit() {
    this.service.getApplicants()
                .subscribe((applicantData)=>this.applicants = applicantData);
        
  }
  addApplicant(): void{
   this.route.navigate(['/addApplicant']);
  }
}
