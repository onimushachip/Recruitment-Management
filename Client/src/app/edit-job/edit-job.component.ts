import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IJobInfo } from '../data-modules/job';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
                        "experience": -1,
                        "skills": [] };
  constructor(
    public apiService : ApiService, 
    private activRoute : ActivatedRoute,
    private route : Router) {}
  delete()
  {
    if(this.apiService.getUsername() === this.jobInfo.recruiterUserId)
    {
      console.log(this.jobInfo._jobCode);
      if(confirm("Are you sure you want to delete this posting?"))
      {
        this.apiService.deleteJob(this.jobInfo._jobCode).subscribe((data) =>{ console.log(data);
                                                         alert('Job Posting Removed');
                                                         this.route.navigate(['/job']);});
      }
    }
    else
    {
      alert('Only Job Creator is Authorized to remove this Job');
    }
  }
  update()
  {
    console.log(this.jobInfo.skills[0]);
    if(this.jobInfo._id != "" && this.jobInfo._jobCode != ""&&
       this.jobInfo.approval != "" && this.jobInfo.experience != -1&&
       this.jobInfo.jobTitle != "" && this.jobInfo.recruiterUserId != ""&&
       this.jobInfo.skills[0] != null)
    {
      this.jobInfo.skills = (this.jobInfo.skills).toString().split(',');
      for(var i = 0;i < this.jobInfo.skills.length;i++)
      {
        this.jobInfo.skills[i] = this.jobInfo.skills[i].trim();
      }
      this.apiService.updateJob(this.jobInfo).subscribe((data)=>{console.log(data),
                                                                alert('Job Posting Updated');
                                                                this.route.navigate(['/job']);});
    }
  }
  ngOnInit() 
  {
    this.activRoute.params.subscribe((params)=> {this.jobInfo._id = params['jobID'] });
    this.apiService.getJobById(this.jobInfo._id).subscribe((data) =>{ this.jobInfo = data; console.log(this.jobInfo.skills)});
  }

}
