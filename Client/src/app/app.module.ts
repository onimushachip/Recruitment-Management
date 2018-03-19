import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

// import http
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { ApiService } from './api.service';
import { ApplicantSearchComponent } from './applicant-search/applicant-search.component';
import { AddApplicantComponent } from './add-applicant/add-applicant.component';
import { JobListComponent } from './job-list/job-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { AddJobPostingComponent } from './add-job-posting/add-job-posting.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { EditApplicantComponent } from './edit-applicant/edit-applicant.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ApplicantComponent,
    NotFoundComponent,
    WelcomeComponent,
    EditJobComponent,
    ApplicantSearchComponent,
    AddApplicantComponent,
    JobListComponent,
    AddUserComponent,
    ApplicantDetailComponent,
    EditApplicantComponent,
    AddJobPostingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
