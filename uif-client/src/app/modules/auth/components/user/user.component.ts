import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user!: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

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

}
