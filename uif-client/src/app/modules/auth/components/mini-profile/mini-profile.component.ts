import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit {

  constructor(protected auth: AuthService) { }

  ngOnInit(): void { }

  get username(): string {
    return this.auth.userData?.displayName.split(' ')[0];
  }

  logout() {
    this.auth.signOut();
    window.location.reload();
  }
}
