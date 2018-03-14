import { Component, OnInit } from '@angular/core';

import { IApplicant } from '../data-modules/applicant';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  applicants: IApplicant [];
  constructor(private service: ApiService ) { }

  ngOnInit() {
    this.service.getApplicants()
                .subscribe((applicantData)=>this.applicants = applicantData);
        
  }
}
