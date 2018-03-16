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
      this.newApplicant.skills = (this.newApplicant.skills).toString().split(',');
      console.log(this.newApplicant.skills);
      this.apiService.insertApplicant(this.newApplicant)
      .subscribe((data)=>{console.log(data);
        this.route.navigate(['/applicant']);});
      //redirto applicant component
      
  }
  
  /*
  update()
  {
    this.jobInfo.skills = (this.jobInfo.skills).toString().split(',');
    this.apiService.updateJob(this.jobInfo).subscribe((data)=>console.log(data));
  }
  */
}
