import { Component, OnInit, ViewChild } from '@angular/core';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { UserService } from '../../services/users.service';
import { NewUser, User, UsersResponse } from '../../models/user.model';

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
  filteredUsers: User[] = [];
  usersOfCurrentPageData: readonly User[] = [];

  searchTerm: string = '';

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
        this.filteredUsers = response.data;
        this.updateEditCache();
      },
      error: (error) =>
        this.setMessage(
          error.error.message || 'Failed to load users!',
          'error'
        ),
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchTerm = searchValue;
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  showAddUserModal(): void {
    this.addUserModal.show();
  }

  handleUserAdded(newUser: NewUser): void {
    this.usersService.createUser(newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.searchTerm = '';
        this.setMessage('User Created Successfully!', 'success');
      },
      error: (error) => this.setMessage(error.error.message, 'error'),
    });
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
    this.resetMessages();
  }

  startDelete(id: string): void {
    this.deleteCache[id].confirm = true;
    this.resetMessages();
  }

  cancelEdit(id: string): void {
    if (this.editCache[id]) {
      this.editCache[id].edit = false;
    }
  }

  saveEdit(id: string): void {
    const userIndex = this.users.findIndex((user) => user._id === id);
    if (userIndex !== -1) {
      this.usersService.updateUser(id, this.editCache[id].data).subscribe({
        next: () => {
          this.users[userIndex] = { ...this.editCache[id].data };
          this.setMessage('User Updated Successfully!', 'success');
          this.loadUsers();
          this.searchTerm = '';
          this.cancelEdit(id);
        },
        error: (error) => this.setMessage(error.error.message, 'error'),
      });
    }
  }

  cancelDelete(id: string): void {
    if (this.deleteCache[id]) {
      this.deleteCache[id].confirm = false;
    }
  }

  deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        const userIndex = this.users.findIndex((user) => user._id === id);
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1);
          this.searchTerm = '';
          delete this.editCache[id];
          delete this.deleteCache[id];
        }
        this.setMessage('User Deleted Successfully!', 'success');
        this.loadUsers();
        this.cancelDelete(id);
      },
      error: (error) => this.setMessage(error.error.message, 'error'),
    });
  }

  updateEditCache(): void {
    this.users.forEach((user) => {
      this.editCache[user._id] = { edit: false, data: { ...user } };
      this.deleteCache[user._id] = { confirm: false };
    });
  }

  trackById(index: number, item: User): string {
    return item._id;
  }

  private setMessage(message: string, type: 'success' | 'error'): void {
    if (type === 'success') {
      this.addUserModal.setSuccessMessage(message);
      this.addUserModal.setErrorMessage('');
    } else {
      this.addUserModal.setErrorMessage(message);
      this.addUserModal.setSuccessMessage('');
    }
  }

  private resetMessages(): void {
    this.addUserModal.setErrorMessage('');
    this.addUserModal.setSuccessMessage('');
  }
}
