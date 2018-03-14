import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IJobInfo } from '../data-modules/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs : IJobInfo[];
  constructor(private apiService : ApiService) { }

  ngOnInit()
  {
    this.apiService.getJobs().subscribe((data) => this.jobs = data);
  }

}
