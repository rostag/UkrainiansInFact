import { Injectable, NgZone } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { ParsedToken } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { HttpsCallableResult } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import { from, Observable, of } from 'rxjs';
import { User, UserRole, userRoleDisplayNames, UserRoleName } from '../user';

export interface UIFError extends FirebaseError {};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  userData!: User;
  userIsAdmin = false;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    private _snackBar: MatSnackBar,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user as User;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
      this.detectUserRoles();
    });
  }
  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['main/dashboard']);
          }
        });
      })
      .catch((error) => this.showAuthError(error));
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => this.showAuthError(error));
  }
  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['auth', 'verify-email-address']);
      });
  }
  // Reset Forgotnen password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Електронний лист для зміни пароля надіслано, перевірте папку "Вхідні"');
      })
      .catch((error) => this.showAuthError(error));
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['main/dashboard']);
    });
  }
  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['main/dashboard']);
        this.setUserData(result.user);
      })
      .catch((error) => this.showAuthError(error));
  }

  getAllUsers(): Observable<User[]> {
    const getAllUsers = firebase.functions().httpsCallable('getAllUsers');
    const promise = getAllUsers({ numberOfUsers: 100 })
      .then((result: HttpsCallableResult) => {
        return result.data as User[];
      });
    return from(promise);
  }

  getUserById(uid: string): Observable<User> {
    const getUserById = firebase.functions().httpsCallable('getUserById');
    return from(getUserById({ uid })
      .then((result: HttpsCallableResult) => {
        return result.data as User;
      }));
  }

  userIsAllowedTo(action: string, resource: string): any {
    return false;
  } 

  userHasClaims(user: User) {
    return user?.parsedClaims;
  }

  getUserClaims(user: User): Observable<UserRole[]> {
    if (this.userHasClaims(user)) {
      return of(user.parsedClaims!);
    }
    const getUserClaims = firebase.functions().httpsCallable('getUserClaims');
    user.parsedClaims = [];

    return from(getUserClaims({ uid: user.uid })
      .then((result: HttpsCallableResult) => {
        Object.entries(result.data as ParsedToken).forEach((claim) => {
          const roleName = claim[0] as UserRoleName;
          user.parsedClaims!.push({ name: roleName, enabled: claim[1], displayName: userRoleDisplayNames.get(roleName) });
        })
        return user.parsedClaims!;
      }));
  }

  setUserClaims(user: User, role: UserRole) {
    const claims: any = {};

    user.parsedClaims!.find(claim => claim.name === role.name)!.enabled = role.enabled;
    user.parsedClaims!.forEach((c) => {
      claims[c.name] = c.enabled;
    })

    return from(firebase.functions().httpsCallable('setUserClaims')({
      uid: user.uid,
      claims,
    })
    .then((result: HttpsCallableResult) => result)
    .catch(function(error) {
      console.log('e:', error);  
    }));
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: Partial<User> = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    // this.setRole(user);
    return userRef.set(userData, {
      merge: true,
    });
  }

  detectUserRoles() {
    this.userData?.getIdTokenResult()
      .then((idTokenResult: any) => {
        if (!!idTokenResult.claims.admin) {
          this.userIsAdmin = true;
        } else {
          this.userIsAdmin = false;
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['about']);
    });
  }

  messageMap = new Map<string, string>([
    ["auth/popup-closed-by-user", "Ви закрили вікно входу через Google, не використавши його. Спробуйте ще раз, будь ласка."],
    ["auth/invalid-email", "Email не відповідає формату адреси електронної пошти. Спробуйте ще раз, будь ласка."],
    ["auth/internal-error", "Помилка сервісу. Спробуйте ще раз, будь ласка."],
    ["auth/missing-email", "Не вказано  сервісу. Спробуйте ще раз, будь ласка."],
    ["auth/email-already-in-use", "Ця поштова скринька вже зареєстрована. Спробуйте вказати іншу адресу або увійти з цією."],
    ["auth/weak-password", "Обраний пароль занадто слабкий. Спробуйте складніший пароль, будь ласка."],
    ["auth/popup-blocked", "Спливаюче вікно заблоковане браузером. Спробуйте ще раз, будь ласка."],
    ["auth/cancelled-popup-request", "Запит на відкриття спливаючого вікна було скасовано. Спробуйте ще раз."],
  ]);

  showAuthError(error: UIFError) {
    const message = JSON.stringify(error, null, 2);
    let messageText = `Помилка: ${this.messageMap.get(error.code) || error.code || ' деталі невідомі. Спробуйте ще раз.'}`;
    this._snackBar.open(messageText, 'OK', { verticalPosition: 'top' });
  }

  navigateToUserDetails(user: User) {
    this.router.navigate(['/user', user.uid])
  }
}