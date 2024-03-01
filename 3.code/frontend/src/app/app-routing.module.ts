import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'student', component: StudentComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
