import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allUsers: Observable<User[]> = of([]);

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.allUsers = this.auth.getAllUsers();
  }

  makeAdmin(user: User) {
    this.auth.makeAdmin(user).subscribe((res) => {
      console.log('claims are set:', res);
    });
  }

  getClaims(user: User) {
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

  showUser(user: User) {
    this.getClaims(user);
  }  
}
