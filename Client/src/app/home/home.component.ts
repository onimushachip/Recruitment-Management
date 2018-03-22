import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserStats } from '../data-modules/User';
import { IJobInfo } from '../data-modules/job';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userFirstName: String;
  private userLastName: String;
  private userType: String;

  private jobs: IJobInfo[];
  private users: Map<String, UserStats>;
  private userStats: UserStats[] = [];

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.userFirstName = this.apiService.getUserFirstName();
    this.userLastName = this.apiService.getUserLastName();
    this.userType = this.apiService.getUserType();
    this.makeDashBoard();
  }

  makeDashBoard(){
    this.apiService.getJobs()
        .subscribe((jobData)=>{
          this.jobs = jobData;
          this.users = new Map<String, UserStats>();
          for(var i=0; i<this.jobs.length; i++){
            if(this.users.has(this.jobs[i].recruiterUserId)){
              this.users.get(this.jobs[i].recruiterUserId).numJobs += 1;
              if(this.jobs[i].approval == "Approved")
                this.users.get(this.jobs[i].recruiterUserId).approved += 1;
              else if(this.jobs[i].approval == "Not Approved")
                this.users.get(this.jobs[i].recruiterUserId).denied += 1;
              else
                this.users.get(this.jobs[i].recruiterUserId).waiting += 1;
            }else{
                let ustats: UserStats = new UserStats();
                ustats._userId = this.jobs[i].recruiterUserId;
                ustats.numJobs = 0, ustats.approved = 0, ustats.denied = 0, ustats.waiting = 0;
                ustats.numJobs += 1;
                if(this.jobs[i].approval == "Approved")
                  ustats.approved += 1;
                else if(this.jobs[i].approval == "Not Approved")
                  ustats.denied += 1;
                else
                  ustats.waiting += 1;
                this.users.set(ustats._userId, ustats);
                this.userStats.push(ustats);
            }
          }
        });
  }

}
