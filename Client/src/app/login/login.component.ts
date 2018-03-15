import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../data-modules/User';
import {Router} from '@angular/router'


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
    this.apiService.getOneUser(this.username).subscribe((data) => this.checkPassword(data));
  }

  checkSharedStatus() {
    console.log(this.apiService.checkLoginStatus());
  }

  checkPassword(input: User) {
    console.log(input.password);
    if (this.password === input.password) {
      console.log("Login Successfully!");
      this.apiService.flagLogin();
      this.route.navigate(['/home']);
    }
    else {
      console.log("Login failed!");
    }
  }

}
