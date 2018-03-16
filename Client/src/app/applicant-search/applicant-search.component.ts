import { Component, OnInit } from '@angular/core';
import { IApplicant } from '../data-modules/applicant';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applicant-search',
  templateUrl: './applicant-search.component.html',
  styleUrls: ['./applicant-search.component.css']
})

export class ApplicantSearchComponent
implements OnInit {



          type : String = "firstName";
          criteria : String = "";
          applicants : IApplicant[];
          constructor(private apiService : ApiService) { }
        
          search()
          {
            if(this.criteria != "")
            {
              for(var i = 0; i < this.applicants.length; i++){
                console.log(this.applicants);
              }
              console.log(this.type);
              if(this.type === "FirstName")
                this.apiService.getApplicantsFirstName(this.criteria).subscribe((data) => {this.applicants = []; this.applicants = data;});
              else if(this.type === "LastName")
                this.apiService.getApplicantsLastName(this.criteria).subscribe((data) => {this.applicants = data;});
            }
            else
            {
              this.apiService.getApplicants().subscribe((data) => this.applicants = data);
            }
          }
          ngOnInit()
          {
            this.apiService.getApplicants().subscribe((data) => this.applicants = data);
          }

        }

      
 



