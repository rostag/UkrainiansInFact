import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { User, UserRole } from '../../services/user';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allUsers: Observable<User[]> = of([]);

  constructor(
    protected auth: AuthService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.allUsers = this.auth.getAllUsers();
  }

  enableRoleForUser(event: boolean, user: User, role: UserRole) {
    this.auth.setUserClaims(user, {...role, enabled: event});
  }

  showUser(user: User) {
    this.auth.getUserClaims(user).pipe(untilDestroyed(this)).subscribe();
  }  

  navigateToUser(user: User) {
    this.router.navigate(['/user', user.uid])
  }
    
}
