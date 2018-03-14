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
  jobID : String;
  jobInfo : IJobInfo;
  constructor(private apiService : ApiService, private activRoute : ActivatedRoute) {}
  ngOnInit() 
  {
    this.activRoute.params.subscribe((params)=> {this.jobID = params['jobID'] });
    this.apiService.getJobInfo(this.jobID).subscribe((data) => this.jobInfo = data);
  }

}
