import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';
import { TeacherManagementComponent } from './components/teacher-management/teacher-management.component';
import { SubjectManagementComponent } from './components/subject-management/subject-management.component';
import { SectionManagementComponent } from './components/section-management/section-management.component';
import { AreaManagementComponent } from './components/area-management/area-management.component';
import { IndicatorManagementComponent } from './components/indicator-management/indicator-management.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';
import { EvaluationManagementComponent } from './components/evaluation-management/evaluation-management.component';
import { ReportManagementComponent } from './components/report-management/report-management.component';
import { ResultManagementComponent } from './components/result-management/result-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListUsersComponent,
    DashboardComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    StudentManagementComponent,
    TeacherManagementComponent,
    SubjectManagementComponent,
    SectionManagementComponent,
    AreaManagementComponent,
    IndicatorManagementComponent,
    QuestionManagementComponent,
    SurveyManagementComponent,
    EvaluationManagementComponent,
    ReportManagementComponent,
    ResultManagementComponent,
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
