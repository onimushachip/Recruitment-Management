import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IJobInfo } from '../data-modules/job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  jobInfo : IJobInfo = {"_id": "",
                        "_jobCode": "",
                        "jobTitle": "",
                        "recruiterUserId": "",
                        "approval": "",
                        "experience": 0,
                        "skills": [] };
  constructor(
    public apiService : ApiService, 
    private activRoute : ActivatedRoute) {}
  update()
  {
    this.jobInfo.skills = (this.jobInfo.skills).toString().split(',');
    for(var i = 0;i < this.jobInfo.skills.length;i++)
    {
      this.jobInfo.skills[i] = this.jobInfo.skills[i].trim();
    }
    this.apiService.updateJob(this.jobInfo).subscribe((data)=>console.log(data));
  }
  ngOnInit() 
  {
    this.activRoute.params.subscribe((params)=> {this.jobInfo._id = params['jobID'] });
    this.apiService.getJobById(this.jobInfo._id).subscribe((data) =>{ this.jobInfo = data; console.log(this.jobInfo.skills)});
  }

}
