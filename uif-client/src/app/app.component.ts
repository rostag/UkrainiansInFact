import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { exhaustMap, from, of } from 'rxjs';
import { LazyDirective } from './directives/lazy.directive';
import { MiniProfileComponent } from './modules/auth/components/mini-profile/mini-profile.component';
import { AuthService } from './modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(protected auth: AuthService) { }

  @ViewChild(LazyDirective, { static: false }) miniProfile!: LazyDirective;

  ngOnInit(): void {
    this.showMiniProfileViaLazyLoading();
  }

  showMiniProfileViaLazyLoading() {
    from(import('./modules/auth/components/mini-profile/mini-profile.component').then((m) => m.MiniProfileComponent))
      .pipe(
        exhaustMap((value: Type<MiniProfileComponent>) => {
          this.miniProfile.viewContainerRef.createComponent(value);
          return of(value);
        })
      )
      .subscribe();
  }
}

