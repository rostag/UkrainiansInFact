import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  makeAdmin(user: User) {
    this.auth.makeAdmin(user).subscribe((res) => {
      console.log('claims are set:', res);
    });
  }

  getClaims(user: User) {
    this.auth.getClaims(user).subscribe((res) => {
      console.log('get claims: ', res);
    });
  }

  allUsers: Observable<User[]> = of([]);
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.allUsers = this.auth.getAllUsers();
  }
  
}
