import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/user';

@UntilDestroy()

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input() user!: User;

  uid!: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute) {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.uid = params['uid'];
      this.auth.getUserById(this.uid).pipe(untilDestroyed(this)).subscribe((user) => {
        this.user = user;
      });
    });
  }

  getClaims(user: User) {
    this.auth.getClaims(user).subscribe((res) => {
      console.log('get claims: ', res);
    });
  }

}
