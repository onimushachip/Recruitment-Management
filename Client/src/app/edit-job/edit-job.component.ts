import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  jobID : String;
  jobInfo : Object;
  constructor() {}
  findJob()
  {
    console.log(this.jobID);
    //this.jobInfo = this.jobService.getJobInfo("1");
  }
  ngOnInit() {
  }

}
