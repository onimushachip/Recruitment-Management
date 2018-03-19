import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobListComponent } from './job-list/job-list.component';
import { ApplicantSearchComponent } from './applicant-search/applicant-search.component';
import { AddApplicantComponent } from './add-applicant/add-applicant.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddJobPostingComponent } from './add-job-posting/add-job-posting.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { EditApplicantComponent } from './edit-applicant/edit-applicant.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const routes : Routes = 
[
  {path : 'login', component : LoginComponent},
  {path : 'home', component : HomeComponent},
  {path : 'applicant', component : ApplicantComponent},
  {path : 'applicant/:jobID', component : ApplicantComponent},
  {path : 'applicant/details/:apId', component : ApplicantDetailComponent},
  {path : 'applicant/:jobID/details/:apId', component : ApplicantDetailComponent},
  {path : 'editApplicant/:apId', component : EditApplicantComponent},
  {path : 'job', component : JobListComponent},
  {path : 'job/editJob/:jobID', component : EditJobComponent},
  {path : 'job/jobDetails/:jobID', component : JobDetailComponent},
  {path : 'job/addJob', component : AddJobPostingComponent},
  {path : 'applicantS', component : ApplicantSearchComponent},

  {path : 'addApplicant', component : AddApplicantComponent},
  {path : 'login/register', component : AddUserComponent},

  {path : '', component : WelcomeComponent},
  {path : '**', component : NotFoundComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
   imports: [ 
    RouterModule.forRoot(routes) 
  ]
})
export class AppRoutingModule { } 
