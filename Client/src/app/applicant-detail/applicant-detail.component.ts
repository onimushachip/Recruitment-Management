import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {IApplicant} from '../data-modules/applicant';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css']
})
export class ApplicantDetailComponent implements OnInit {
  private applicant: IApplicant= new IApplicant();
  private apId: number;
  test: String = "TEst Way";
  constructor(
    public apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params)=> { this.apId = params['apId']; 
      this.apiService.getApplicant(this.apId).subscribe(
        (apData) =>{this.applicant = <IApplicant>apData;});
    });
    
  }
  

}
