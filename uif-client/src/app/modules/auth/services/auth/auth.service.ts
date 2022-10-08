import { Injectable, NgZone } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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
import { from, Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  userData: any; // Save logged in user data
  constructor(
    public afdb: AngularFireDatabase, // Inject Firestore service
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
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
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

  getAllUsers(): Observable<auth.User[]> {
    var getAllUsers = firebase.functions().httpsCallable('getAllUsers');
    const promise = getAllUsers({ numberOfUsers: 100 })
      .then((result: HttpsCallableResult) => {
        return result.data as auth.User[];
      });
    return from(promise);
  }

  getClaims(user: auth.User) {
    var getUserClaims = firebase.functions().httpsCallable('getUserClaims');

    const promise = getUserClaims({ uid: user.uid })
      .then((result: HttpsCallableResult) => {
        return result.data;
      });
    return from(promise);
  }

  setUserClaims(user: any, claims: any) {
    let tkn;
    this.afAuth.idToken.pipe().subscribe((tk) => {
      tkn = tk;
    });

    var setUserClaims = firebase.functions().httpsCallable('setUserClaims');
    
    const promise = setUserClaims({
      uid: user.uid,
      claims: claims,
      idToken: tkn
    })
    .then((result: HttpsCallableResult) => {
      return result.data;
    })
    .catch(function(error) {
      console.log('e:', error);  
    });

    return from(promise);

      // This is not required. You could just wait until the token is expired
      // and it proactively refreshes.
      // if (status == 'success' && data) {
      //   const json = JSON.parse(data);
      //   if (json && json.status == 'success') {
      //     // Force token refresh. The token claims will contain the additional claims.
      //     this.afAuth.currentUser.getIdToken(true);
      //   }
      // }
    // });
  }

  makeAdmin(user: auth.User) {
    return this.setUserClaims(user, {admin: true, editor: true});
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
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

  // setRole(currentUser: any) {
  //   currentUser.getIdTokenResult()
  //   .then((idTokenResult: any) => {
  //     // Confirm the user is an Admin.
  //     if (!!idTokenResult.claims.admin) {
  //       // Show admin UI.
  //       this.showAdminUI();
  //     } else {
  //       // Show regular user UI.
  //       this.showRegularUI();
  //     }
  //   })
  //   .catch((error: Error) => {
  //     console.log(error);
  //   });
  // }

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
  ]);

  showAuthError(error: FirebaseError) {
    const message = JSON.stringify(error, null, 2);
    let messageText = `Помилка: ${this.messageMap.get(error.code) || error.code || ' деталі невідомі. Спробуйте ще раз.'}`;
    this._snackBar.open(messageText, 'OK', { verticalPosition: 'top' });
  }
}