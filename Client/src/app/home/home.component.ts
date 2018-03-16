import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userFirstName: String;
  private userLastName: String;
  private userType: String;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.userFirstName = this.apiService.getUserFirstName();
    this.userLastName = this.apiService.getUserLastName();
    this.userType = this.apiService.getUserType();
  }

}
