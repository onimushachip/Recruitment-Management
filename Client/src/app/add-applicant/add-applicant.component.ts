import { Component, OnInit } from '@angular/core';
import { NewApplicant } from '../data-modules/applicant';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {
  private newApplicant: NewApplicant = new NewApplicant();
  private userId: String = "user";
  private isValid: boolean;
  private message: String = "";
  
  constructor(
    private apiService: ApiService,
    private route: Router
  ) { }

  ngOnInit() {
    this.userId = this.apiService.getUsername();
    this.newApplicant.recruiterUserId = this.userId;  
  }
  addApplicant(){    
      console.log("Add");
      this.message = this.validate();
      if(this.isValid == true){
        this.newApplicant.skills = (this.newApplicant.skills).toString().split(',');
        for(var i = 0; i<this.newApplicant.skills.length;  i++){
          this.newApplicant.skills[i] = this.newApplicant.skills[i].trim();
        }
        console.log(this.newApplicant.skills);
        this.apiService.insertApplicant(this.newApplicant)
        .subscribe((data)=>{console.log(data);
          this.route.navigate(['/applicant']);});
      //redirto applicant component
      }
  }
  validate(): String{
    let msg = "Missing required Field/s";
    let valList = [];
      if(this.newApplicant.firstName == "" || this.newApplicant.firstName == null){
        msg += "<br>First Name required";
        valList.push(0);
      }else{
        valList.push(1);
      }
      if(this.newApplicant.lastName == "" || this.newApplicant.lastName == null){
        msg += "<br>Last Name required";
        valList.push(0);
      }else{
        valList.push(1);
      }
      if(this.newApplicant.email == "") {
        msg += "<br>missing email";
        valList.push(0);
      }else{
        if(this.newApplicant.email != null){
          if(this.newApplicant.email.indexOf("@")<= -1){
            msg += "<br>invalid email";
            valList.push(0);
          }
        }
       else
          valList.push(1);
      }
      if(this.newApplicant.experience == null){
        msg += "<br>Experience required";
        valList.push(0);
      }else{
        valList.push(1);
      }
      if(this.newApplicant.skills == null){
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

  /*
  update()
  {
    this.jobInfo.skills = (this.jobInfo.skills).toString().split(',');
    this.apiService.updateJob(this.jobInfo).subscribe((data)=>console.log(data));
  }
  */
}
