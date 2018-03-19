import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../data-modules/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: String;
  private password: String;

  constructor(
    private apiService : ApiService, 
    private route: Router
    ) { }

  ngOnInit() {
  }

  login() {
    this.apiService.getOneUser(this.username).subscribe((data) => {
      this.checkUserInfo(data, this.apiService);
    });
  }

  checkSharedStatus() {
    console.log(this.apiService.checkLoginStatus());
  }

  checkUserInfo(input: User, apiInput: ApiService) {
    if (input == null) {
      alert("Login failed!!!");
      return;
    }
    this.checkPassword(input);
    this.checkUserType(input);
  }

  checkPassword(input: User) {
    if (this.password === input.password) {
      console.log("Login Successfully!");
      this.apiService.flagLogin();
      this.apiService.setUsername(input._userId);
      this.apiService.setUserFirstname(input.firstName);
      this.apiService.setUserLastName(input.lastName);
      this.route.navigate(['/home']); 
    }
    else {
      console.log("Login failed!");
      alert("Login Failed!!!");
    }
  }

  checkUserType(input: User) {
    // console.log(input.userType);
    if (input.userType === "Manager") {
      this.apiService.flagManagerType();
    }
    else if (input.userType === "Recruiter") {
      this.apiService.flagRecruiterType();
    }
    else {
      console.log("NOT AUTHORIZED USER TYPE!!!");
      this.apiService.flagLogout();
    }
    var test: String = this.apiService.getUserType();
  }

}
