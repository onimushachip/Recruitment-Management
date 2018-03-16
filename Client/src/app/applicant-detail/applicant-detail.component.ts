import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {IApplicant} from '../data-modules/applicant';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css']
})
export class ApplicantDetailComponent implements OnInit {
  private applicant: IApplicant= new IApplicant();
  private apId: number;
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params)=> { this.apId = params['apId']; 
      this.apiService.getApplicant(this.apId).subscribe(
        (apData) =>{this.applicant = <IApplicant>apData;});
    });
  }
  deleteApplicant(){
    var userId = this.apiService.getUsername();
    console.log("Deleting "+this.applicant.firstName);
    if(userId == this.applicant.recruiterUserId){

      console.log(userId+" Can delete");
      if(confirm("Are you sure you want to delete applicant")){
        this.apiService.deleteApplicant( this.applicant._applicantId, userId)
      .subscribe((data)=>{console.log(data); 
        this.route.navigate(['/applicant']);
      });
      
      }
    }
     else{
      console.log(userId+" can't delete");
      alert("You are not authorized to delete this applicant");
    }
  }

  updateApplicant(){
    this.route.navigate(['editApplicant/'+this.applicant._applicantId]);
  }
  

}
