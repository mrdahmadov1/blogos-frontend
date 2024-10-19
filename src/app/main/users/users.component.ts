import { Component, OnInit, ViewChild } from '@angular/core';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild('addUserModal') addUserModal!: AddUserModalComponent; // Access the AddUserModal component

  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  deleteCache: { [key: string]: { confirm: boolean } } = {};
  users: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Initialize the user data and form
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Edward ${i}`,
        email: `edward${i}@example.com`,
        role: `User`,
      });
    }
    this.users = data;
    this.updateEditCache();
  }

  showAddUserModal(): void {
    this.addUserModal.show(); // Show the modal through a reference
  }

  handleUserAdded(newUser: any): void {
    this.users = [...this.users, newUser];
    this.updateEditCache();
    console.log('User added:', newUser);
  }

  // Edit and Delete logic
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  startDelete(id: string): void {
    this.deleteCache[id].confirm = true;
  }

  cancelEdit(id: string): void {
    const index = this.users.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.users[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.users.findIndex((item) => item.id === id);
    Object.assign(this.users[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  cancelDelete(id: string): void {
    this.deleteCache[id].confirm = false;
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      delete this.editCache[id];
      delete this.deleteCache[id];
    }
  }

  updateEditCache(): void {
    this.users.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
      this.deleteCache[item.id] = {
        confirm: false,
      };
    });
  }

  trackById(index: number, item: any): string {
    return item.id;
  }
}
