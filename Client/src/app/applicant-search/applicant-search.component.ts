import { Component, OnInit } from '@angular/core';
import { IApplicant } from '../data-modules/applicant';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applicant-search',
  templateUrl: './applicant-search.component.html',
  styleUrls: ['./applicant-search.component.css']
})

export class ApplicantSearchComponent {

  applicants: IApplicant [];

  constructor(private service: ApiService ) { }

  performSearch(searchTermF: HTMLInputElement){
    console.log("help")
    console.log(searchTermF);
    console.log("help2");
    console.log(searchTermF.value);

    this.service.getApplicantsFirstName(searchTermF.value)
            .subscribe(applicants => {
                this.applicants = applicants;
            });

  }

  performSearchLast(searchTerm: HTMLInputElement){
    console.log(searchTerm.value);

    this.service.getApplicantsLastName(searchTerm.value)
            .subscribe(applicants => {
                this.applicants = applicants;
            });

  }

}