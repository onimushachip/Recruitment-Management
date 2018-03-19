import { Component, OnInit } from '@angular/core';
import { User } from '../data-modules/User';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  private username: String;
  private password: String;
  private email: String;
  private userType: String;
  private firstName: String;
  private lastName: String;

  private newUser: User = new User();

  constructor(
    private apiService: ApiService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  getInputs() {
    this.newUser._userId = this.username;
    this.newUser.password = this.password;
    this.newUser.firstName = this.firstName;
    this.newUser.lastName = this.lastName;
    this.newUser.email = this.email;
    this.newUser.userType = this.userType;
    this.newUser._id = this.username;
  }

  checkInputs(): boolean {
    // console.log(this.username);
    // console.log(this.password);
    // console.log(this.firstName);
    // console.log(this.lastName);
    // console.log(this.email);
    // console.log(this.userType);
    // console.log(this.newUser._id);
    var valid: boolean = true;

    if (this.username === "") {
      alert("Username is required!!");
      valid = false;
    }
    
    if (this.password.length < 6) {
      alert("Password is required and longer than 5 characters!");
      valid = false;
    }
    
    if (this.firstName === "") {
      alert("First Name is required!!");
      valid = false;
    }

    if (this.lastName === "") {
      alert("Last Name is required!!");
      valid = false;
    }

    if (this.email === "") {
      alert("Email is required!!!");
      valid = false;
    }

    if (this.userType === "") {
      alert("User Type is required!!");
      valid = false;
    }

    return valid;
  }

  sendNewUser() {
    if (!this.checkInputs()) {
      return;
    }
    this.apiService.createOneUser(this.newUser).subscribe((data) => {
      console.log(data);
      if (data === null) {
        alert("Failed to create a new user!!!!");
        return;
      };
      alert("A New User Created!!");
      this.route.navigate(['/']);
    });
  }  

}
