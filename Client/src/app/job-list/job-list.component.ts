import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IJobInfo } from '../data-modules/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  type : String = "code";
  criteria : String = "";
  jobs : IJobInfo[];
  constructor(
    private apiService : ApiService
  ) { }

  search()
  {
    if(this.criteria != "")
    {
      if(this.type === "code")
        this.apiService.getJobById(this.criteria).subscribe((data) => {this.jobs = []; this.jobs[0] = data;});
      else if(this.type === "title")
        this.apiService.getJobsByTitle(this.criteria).subscribe((data) => {this.jobs = data;});
    }
    else
    {
      this.apiService.getJobs().subscribe((data) => this.jobs = data);
    }
  }
  ngOnInit()
  {
    this.apiService.getJobs().subscribe((data) => this.jobs = data);
  }

}
