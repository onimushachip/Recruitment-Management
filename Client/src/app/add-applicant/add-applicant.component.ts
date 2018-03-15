import { Component, OnInit } from '@angular/core';
import { NewApplicant } from '../data-modules/applicant';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {
  private newApplicant: NewApplicant = new NewApplicant();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  addApplicant(){
      console.log("Add");
      this.newApplicant.skills = (this.newApplicant.skills).toString().split(',');
      console.log(this.newApplicant.skills);
      this.apiService.insertApplicant(this.newApplicant).subscribe((data)=>{console.log(data);});
  }
  /*
  update()
  {
    this.jobInfo.skills = (this.jobInfo.skills).toString().split(',');
    this.apiService.updateJob(this.jobInfo).subscribe((data)=>console.log(data));
  }
  */
}
