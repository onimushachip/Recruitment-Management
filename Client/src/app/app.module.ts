import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    JobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
