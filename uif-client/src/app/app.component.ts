import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { exhaustMap, from, map, Observable, of, shareReplay } from 'rxjs';
import { LazyDirective } from './directives/lazy.directive';
import { MiniProfileComponent } from './modules/auth/components/mini-profile/mini-profile.component';
import { AuthService } from './modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor (
    protected auth: AuthService, 
    private breakpointObserver: BreakpointObserver
  ) { }

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

