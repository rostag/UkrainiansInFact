import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { User, UserRole, userRoles } from '../../services/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allUsers: Observable<User[]> = of([]);

  userRoles = userRoles;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.allUsers = this.auth.getAllUsers();
  }

  getClaims(user: User) {
    if (this.hasClaims(user)) {
      return
    }
    user.parsedClaims = [];
    this.auth.getClaims(user).subscribe((res) => {
      console.log('get claims: ', res);
      if (res['admin']) {
        user.parsedClaims.push('admin');
      }
      if (res['editor']) {
        user.parsedClaims.push('editor');
      }
    });
  }

  hasClaims(user: User) {
    return user?.parsedClaims;
  }

  userHasRoleEnabled(user: User, role: UserRole) {
    if (!this.hasClaims(user)) {
      return;
    }
    return user.parsedClaims.includes(role);
  }

  enableRoleForUser(user: User, role: UserRole) {
    this.setClaims(user);
  }

  setClaims(user: User) {
    this.userRoles.forEach((roleName: UserRole) => {
      console.log('user:', user.displayName, roleName, ':', this.userHasRoleEnabled(user, roleName));
    });

    // this.auth.setUserClaims(user, {admin: true, editor: false})
    // .subscribe((res) => {
    //   console.log('claims are set:', res);
    // });
  }

  showUser(user: User) {
    this.getClaims(user);
  }  
}
