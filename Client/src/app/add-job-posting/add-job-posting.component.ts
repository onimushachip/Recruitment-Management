import { Component, OnInit } from '@angular/core';
import { JobPosting } from '../data-modules/job';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job-posting',
  templateUrl: './add-job-posting.component.html',
  styleUrls: ['./add-job-posting.component.css']
})
export class AddJobPostingComponent implements OnInit {
  private jobCode: String;
  private jobTitle: String;
  private recruiterUserId: String;
  private approval: String;
  private experience: Number;
  private skills: String;

  private newJobPosting: JobPosting = new JobPosting();

  constructor(
    public apiService: ApiService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  checkInput(): boolean {
    var valid: boolean = true;

    if (this.jobCode === "") {
      alert("Job Code is required!!");
      valid = false;
    }

    if (this.jobTitle === "") {
      alert("Job Title is required!!!");
      valid = false;
    }

    if (this.experience === null) {
      alert("Experience is required to select!!");
      valid = false;
    }

    if (this.skills === "") {
      alert("A set of skills is required!!!");
      valid = false;
    }

    return valid;
  }

  getInputs(): void {
    this.newJobPosting._id = this.jobCode;
    this.newJobPosting._jobCode = this.jobCode;
    this.newJobPosting.jobTitle = this.jobTitle;
    this.newJobPosting.recruiterUserId = this.apiService.getUsername();
    this.newJobPosting.approval = "Waiting";
    this.newJobPosting.experience = this.experience;
    this.newJobPosting.skills = this.getSkillsArray(this.skills);

    console.log(this.newJobPosting.skills);
  }

  getSkillsArray(input: String): String[] {
    var result: String[] = this.skills.split(',');

    return result;
  }

  sendNewJobPosting(): void {
    if (!this.checkInput()) {
      return;
    }

    this.apiService.createOneJobPosting(this.newJobPosting)
      .subscribe((res) => {
        if (res === null) {
          alert("Failed to add a new Job Posting");
          return;
        }
        console.log(res);
        alert("Added A New Job Posting!!!");
        this.route.navigate(['/job']);
      });  
  }
}
