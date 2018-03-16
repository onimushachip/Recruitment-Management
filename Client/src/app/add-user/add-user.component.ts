import { Component, OnInit } from '@angular/core';
import { User } from '../data-modules/User';
import { ApiService } from '../api.service';

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

  constructor(private apiService: ApiService) { }

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

  checkInputs() {
    // console.log(this.username);
    // console.log(this.password);
    // console.log(this.firstName);
    // console.log(this.lastName);
    // console.log(this.email);
    // console.log(this.userType);
    // console.log(this.newUser._id);
  }

  sendNewUser() {
    this.apiService.createOneUser(this.newUser).subscribe((data) => console.log(data));
  }

}
