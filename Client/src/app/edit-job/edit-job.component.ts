import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  jobID : String = "";
  jobInfo : Object = {"jobTitle":"Programmer","recruiterUserId":"0000"};
  constructor() {}
  findJob()
  {
    //this.http.get('localhost:3000/api/getJobById/1')
    //         .map((res:Response) => res.json())
    //         .subscribe((job : Object) => {this.jobInfo = job}, err => console.log("failed to get job"));
  }
  ngOnInit() {
  }

}
