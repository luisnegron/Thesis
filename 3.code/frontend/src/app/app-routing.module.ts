import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import { AdminGuard } from './guards/admin.guards';
import { AuthGuard } from './guards/auth.guard';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['administrator'] },
    children: [
      { path: 'users', component: UserManagementComponent },
      { path: 'students', component: StudentManagementComponent },
      { path: 'teachers', component: TeacherManagementComponent },
      { path: 'subjects', component: SubjectManagementComponent },
      { path: 'sections', component: SectionManagementComponent },
      { path: 'areas', component: AreaManagementComponent },
      { path: 'indicators', component: IndicatorManagementComponent },
      { path: 'questions', component: QuestionManagementComponent },
      { path: 'surveys', component: SurveyManagementComponent },
      { path: 'evaluations', component: EvaluationManagementComponent },
      { path: 'reports', component: ReportManagementComponent },
      { path: 'results', component: ResultManagementComponent }
    ]
  },
  { path: 'student-home', component: StudentHomeComponent, canActivate: [AuthGuard], data: { roles: ['student'] } },
  { path: 'teacher-home', component: TeacherHomeComponent, canActivate: [AuthGuard], data: { roles: ['teacher'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
  { path: 'users', component: DashboardComponent },
  { path: 'students', component: DashboardComponent },
  { path: 'teachers', component: DashboardComponent },
  { path: 'subjects', component: DashboardComponent },
  { path: 'parallels', component: DashboardComponent },
  { path: 'areas', component: DashboardComponent },
  { path: 'indicators', component: DashboardComponent },
  { path: 'questions', component: DashboardComponent },
  { path: 'surveys', component: DashboardComponent },
  { path: 'surveys-responses', component: DashboardComponent },
  { path: 'evaluations', component: DashboardComponent },
  { path: 'reports', component: DashboardComponent },
  { path: 'results', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
