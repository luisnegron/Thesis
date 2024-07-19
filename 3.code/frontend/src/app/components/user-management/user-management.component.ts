import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent /*implements OnInit*/ {
  users: any[] = []; // Asegúrate de que esto sea una lista
  currentUser: any = { name: '', email: '', role: 'student' };
  showModal: boolean = false;
  isEditMode: boolean = false;

  constructor(private authService: AuthService) { }

  /*ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(data => {
      console.log('Data received:', data);
      this.users = data.filter((user: { activo: any; }) => user.activo);
    });
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.currentUser = { name: '', email: '', role: '' };
    this.showModal = true;
  }

  openEditModal(user: any): void {
    this.isEditMode = true;
    this.currentUser = { ...user };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  updateUser(): void {
    this.authService.updateUser(this.currentUser._id, this.currentUser).subscribe(() => {
      this.loadUsers();
      this.closeModal();
    });
  }

  deactivateUser(id: string): void {
    this.authService.deactivateUser(id).subscribe(() => {
      this.loadUsers();
    });
  }*/
}
