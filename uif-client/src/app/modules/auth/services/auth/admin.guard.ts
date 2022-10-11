import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService, UIFError } from "./auth.service";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.userIsAdmin !== true) {
        this.authService.showAuthError({code: "Ця функція доступна лише адмінам."} as UIFError);
        this.router.navigate(['auth', 'sign-in']);
    }
    return true;
  }
}