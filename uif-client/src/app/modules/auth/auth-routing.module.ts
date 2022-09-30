import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { 
    path: '', component: AuthComponent,
    children: [
      {
        path: 'sign-in', loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule),
      },
      {
        path: 'sign-up', loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
