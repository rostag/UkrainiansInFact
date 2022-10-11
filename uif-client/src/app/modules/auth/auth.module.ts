import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { MiniProfileComponent } from './components/mini-profile/mini-profile.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignInComponent,
    SignUpComponent,
    UsersComponent,
    UserComponent,
    MiniProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule
  ]
})
export class AuthModule { }
