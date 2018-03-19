import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IJobInfo } from '../data-modules/job';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  jobInfo : IJobInfo = {"_id": "",
                        "_jobCode": "",
                        "jobTitle": "",
                        "recruiterUserId": "",
                        "approval": "",
                        "experience": 0,
                        "skills": [] };
  constructor(
    public apiService : ApiService, 
    private activRoute : ActivatedRoute,
    private route : Router) {}
  showApplicants()
  {
    this.route.navigate(['/applicant',this.jobInfo._id]);
  }
  ngOnInit() 
  {
    this.activRoute.params.subscribe((params)=> {this.jobInfo._id = params['jobID'] });
    console.log(this.jobInfo._id);
    this.apiService.getJobById(this.jobInfo._id).subscribe((data) =>{ this.jobInfo = data; console.log(this.jobInfo.skills)});
  }

}
