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
  private isValid: boolean;
  private message: String;
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
    this.message = this.validate();
    if(this.isValid){
      this.applicant.skills = (this.applicant.skills).toString().split(',');
      for(var i = 0; i<this.applicant.skills.length;  i++){
        this.applicant.skills[i] = this.applicant.skills[i].trim();
      }
      this.apiService.updateApplicant(this.applicant).subscribe((apData)=>{
        console.log(apData); 
        this.route.navigate(['/applicant']);
      });
    }
    
  }
  validate(): String{
    let msg = "Missing required Field/s";
    let valList = [];
      if(this.applicant.firstName == "" || this.applicant.firstName == null){
        msg += "<br>First Name required";
        valList.push(0);
      }else{
        valList.push(1);
      }
      if(this.applicant.lastName == "" || this.applicant.lastName == null){
        msg += "<br>Last Name required";
        valList.push(0);
      }else{
        valList.push(1);
      }
      if(this.applicant.email == "") {
        msg += "<br>missing email";
        valList.push(0);
      }else{
        if(this.applicant.email != null){
          if(this.applicant.email.indexOf("@")<= -1){
            msg += "<br>invalid email";
            valList.push(0);
          }
        }
       else
          valList.push(1);
      }
      if(this.applicant.experience == null){
        msg += "<br>Experience required";
        valList.push(0);
      }else{
        valList.push(1);
      }
      if(this.applicant.skills == null){
        msg += "<br>Missing skills";
        valList.push(0);
      }else{
        valList.push(1);
      }
      for(var i = 0; i < valList.length; i++){
        if(valList[i] == 0){
          this.isValid = false;
          break;         
        }
        this.isValid = true;
      }
      return msg;
  }
  cancel(){
    this.route.navigate(['/applicant']);
  }

}
