import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  RecordsService,
  RecordItem
} from '../records.service';

import {
  AuthService,
  LoggedInUser
} from '../auth.service';

import {
  UserManagementService,
  UserItem
} from '../user-management.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  records: RecordItem[] = [];

  loading = false;

  errorMessage = '';

  user: LoggedInUser | null = null;

  users: UserItem[] = [];

  usersLoading = false;

  usersErrorMessage = '';

  showAddUserForm = false;

  newUser = {
    userId: '',
    password: '',
    name: '',
    role: 'General User'
  };

  userActionMessage = '';

  constructor(
    private recordsService: RecordsService,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {

    this.user =
      this.authService.getUser();

    this.loadRecords();

    if (this.user?.role === 'Admin') {
      this.loadUsers();
    }
  }

  loadRecords(): void {

    this.loading = true;

    this.errorMessage = '';

    const role =
      this.user?.role || 'General User';

    this.recordsService
      .getRecords(role, 2000)
      .subscribe({

        next: (response) => {

          this.records =
            response.records;

          this.loading = false;

          this.changeDetectorRef
            .detectChanges();

        },

        error: () => {

          this.errorMessage =
            'Unable to load verification records.';

          this.loading = false;

          this.changeDetectorRef
            .detectChanges();

        }

      });
  }

  loadUsers(): void {

    if (this.user?.role !== 'Admin') {
      return;
    }

    this.usersLoading = true;

    this.usersErrorMessage = '';

    this.userManagementService
      .getUsers('Admin')
      .subscribe({

        next: (response) => {

          this.users =
            response.users;

          this.usersLoading = false;

          this.changeDetectorRef
            .detectChanges();

        },

        error: (error) => {

          this.usersErrorMessage =
            error.error?.message ||
            'Unable to load users.';

          this.usersLoading = false;

          this.changeDetectorRef
            .detectChanges();

        }

      });
  }

  openAddUserForm(): void {

    this.showAddUserForm = true;

    this.userActionMessage = '';

    this.newUser = {
      userId: '',
      password: '',
      name: '',
      role: 'General User'
    };
  }

  closeAddUserForm(): void {

    this.showAddUserForm = false;

    this.userActionMessage = '';
  }

  addUser(): void {

    if (
      !this.newUser.userId ||
      !this.newUser.password ||
      !this.newUser.name ||
      !this.newUser.role
    ) {

      this.userActionMessage =
        'Please fill in all fields.';

      return;
    }

    this.userManagementService
      .createUser(
        'Admin',
        this.newUser.userId,
        this.newUser.password,
        this.newUser.name,
        this.newUser.role
      )
      .subscribe({

        next: (response) => {

          this.userActionMessage =
            response.message;

          this.showAddUserForm = false;

          this.loadUsers();

        },

        error: (error) => {

          this.userActionMessage =
            error.error?.message ||
            'Unable to create user.';

          this.changeDetectorRef
            .detectChanges();

        }

      });
  }

  deleteUser(user: UserItem): void {

    if (user.userId === 'admin01') {

      this.userActionMessage =
        'Main Admin account cannot be deleted.';

      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${user.name}?`
      );

    if (!confirmed) {
      return;
    }

    this.userManagementService
      .deleteUser(
        'Admin',
        user.id
      )
      .subscribe({

        next: (response) => {

          this.userActionMessage =
            response.message;

          this.loadUsers();

        },

        error: (error) => {

          this.userActionMessage =
            error.error?.message ||
            'Unable to delete user.';

          this.changeDetectorRef
            .detectChanges();

        }

      });
  }

  getVerifiedCount(): number {

    return this.records.filter(
      record =>
        record.status === 'Verified'
    ).length;
  }

  getPendingCount(): number {

    return this.records.filter(
      record =>
        record.status === 'Pending'
    ).length;
  }

  logout(): void {

    this.authService.logout();

    this.routerToLogin();
  }

  private routerToLogin(): void {

    window.location.href = '/';
  }
}