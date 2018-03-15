import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../data-modules/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: String;
  private password: String;

  constructor(private apiService : ApiService) { }

  ngOnInit() {
  }

  login() {
    this.apiService.getOneUser(this.username).subscribe((data) => this.checkUserInfo(data, this.apiService));
  }

  checkSharedStatus() {
    console.log(this.apiService.checkLoginStatus());
  }

  checkUserInfo(input: User, apiInput: ApiService) {
    this.checkPassword(input);
    this.checkUserType(input);
  }

  checkPassword(input: User) {
    console.log(input.password);
    if (this.password === input.password) {
      console.log("Login Successfully!");
      this.apiService.flagLogin();
    }
    else {
      console.log("Login failed!");
    }
  }

  checkUserType(input: User) {
    console.log(input.userType);
    if (input.userType === "Manager") {
      this.apiService.flagManagerType();
    }
    else if (input.userType === "Recruiter") {
      this.apiService.flagRecruiterType();
    }
    else {
      console.log("NOT AUTHORIZED USER TYPE!!!");
    }
    var test: String = this.apiService.getUserType();
    console.log(test);
  }

}
