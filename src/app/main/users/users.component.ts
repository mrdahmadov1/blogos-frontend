import { Component, OnInit, ViewChild } from '@angular/core';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { UserService } from './users.service';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersResponse {
  status: string;
  results: number;
  data: User[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild('addUserModal') addUserModal!: AddUserModalComponent;

  editCache: { [key: string]: { edit: boolean; data: User } } = {};
  deleteCache: { [key: string]: { confirm: boolean } } = {};
  users: User[] = [];
  usersOfCurrentPageData: readonly User[] = [];
  errorMessage: string | null = null;

  constructor(private usersService: UserService) {}

  onCurrentPageDataChange($event: readonly User[]): void {
    this.usersOfCurrentPageData = $event;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (response: UsersResponse) => {
        this.users = response.data;
        this.updateEditCache();
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.errorMessage = 'Failed to load users';
      },
    });
  }

  showAddUserModal(): void {
    this.addUserModal.show();
  }

  handleUserAdded(newUser: User): void {
    this.users.push(newUser);
    this.updateEditCache();
  }

  // Edit and Delete logic
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  startDelete(id: string): void {
    this.deleteCache[id].confirm = true;
  }

  cancelEdit(id: string): void {
    if (this.editCache[id]) {
      this.editCache[id].edit = false;
    }
  }

  saveEdit(id: string): void {
    const userIndex = this.users.findIndex((user) => user._id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.editCache[id].data }; // Update the user data
      this.cancelEdit(id); // Close the edit mode
    }
  }

  cancelDelete(id: string): void {
    if (this.deleteCache[id]) {
      this.deleteCache[id].confirm = false;
    }
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((user) => user._id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1); // Remove user from the list
      delete this.editCache[id]; // Clear the edit cache
      delete this.deleteCache[id]; // Clear the delete cache
    }
  }

  updateEditCache(): void {
    this.users.forEach((user) => {
      this.editCache[user._id] = {
        edit: false,
        data: { ...user }, // Store a copy of the user data
      };
      this.deleteCache[user._id] = {
        confirm: false,
      };
    });
  }

  trackById(index: number, item: User): string {
    return item._id;
  }
}
