import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {IApplicant} from '../data-modules/applicant';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-applicant',
  templateUrl: './edit-applicant.component.html',
  styleUrls: ['./edit-applicant.component.css']
})
export class EditApplicantComponent implements OnInit {
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
        (apData) =>{this.applicant = <IApplicant>apData; 
       // console.log(this.applicant);
        });
    });
  }
  saveApplicant(){
    this.apiService.updateApplicant(this.applicant).subscribe((apData)=>{
      console.log(apData); 
      this.route.navigate(['/applicant']);
    })
  }

}
